export const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus();
export const selectOnFocus = (node) => {
    if (node && typeof node.select === "function") {
      const onFocus = (event) => node.select();
      node.addEventListener("focus", onFocus);
      return {
        destroy: () => node.removeEventListener("focus", onFocus), // this will be executed when the node is removed from the DOM
      };
    }
}