import { Selector, ClientFunction } from 'testcafe';

const url = 'https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-faq.html';
const focusButton = '.faq > dt > button';
const cButton = Selector('.faq > dt > button');
const cContent = Selector('.faq > dd > p');

const focus = ClientFunction((element) => {
    document.querySelector(element).focus();
});

fixture`Collapsible`
    .page`${url}`;

test('toggle-button is an actual button', async t => {
    await t.expect(cButton.tagName).eql('button');
});

test('toggle content with click and sets aria-expanded', async t => {
    await t.click(cButton);
    await cContent.visible;

    await t.expect(cButton.getAttribute('aria-expanded')).eql('true');

    await t.click(cButton);
    await cContent.hidden;

    await t.expect(cButton.getAttribute('aria-expanded')).eql('false');
});

test('toggle content with enter and sets aria-expanded', async t => {
    await focus(focusButton);
    await t.pressKey('enter');
    await cContent.visible;

    await t.expect(cButton.getAttribute('aria-expanded')).eql('true');

    await t.pressKey('enter');
    await cContent.hidden;

    await t.expect(cButton.getAttribute('aria-expanded')).eql('false');
});
