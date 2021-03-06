// META: script=resources/support.js
//
// Spec: https://wicg.github.io/private-network-access/#integration-fetch
//
// This file covers only those tests that must execute in a secure context.
// Other tests are defined in: non-secure-context.window.js

setup(() => {
  // Making sure we are in a secure context, as expected.
  assert_true(window.isSecureContext);
});

promise_test(async t => {
  return fetch("/common/blank.html")
      .catch(reason => {unreached_func(reason)});
}, "Local secure page fetches local page.");

// For the following tests, we go through an iframe, because it is not possible
// to directly import the test harness from a secured public page.
promise_test(async t => {
  let iframe = await appendIframe(t, document,
      "resources/treat-as-public-address.https.html");
  let reply = futureMessage();
  iframe.contentWindow.postMessage("/common/blank.html", "*");
  assert_equals(await reply, "success");
}, "Public secure page fetches local page.");

// TODO(https://github.com/web-platform-tests/wpt/issues/26166):
// Add tests for public variations when we are able to fetch resources using a
// mechanism compatible with WPT guidelines regarding being self-contained.

