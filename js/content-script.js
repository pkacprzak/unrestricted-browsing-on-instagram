'use strict';

const presentationNodeObserver = new MutationObserver((mutations, observerInstance) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
      for (let i = 0; i < mutation.addedNodes.length; ++i) {
        const node = mutation.addedNodes.item(i);
        const attr = node.getAttribute('role');
        if (attr === 'presentation') {
          node.remove();
          return;
        }
      }
    }
  }
});

const bodyStyleObserver = new MutationObserver((mutations, observerInstance) => {
  if (document.body.style.overflow !== "visible") {
    document.body.style.overflow = "visible";
  }
});

const app = () => {
  presentationNodeObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  bodyStyleObserver.observe(document.body, {
    attributes: true,
  });
};

app();
