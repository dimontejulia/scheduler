const useVisualMode = (intialMode) => {
  const state = {
    elements: [initialMode],
    lastElement: initialMode,
  };

  //add elements to the stack of elements
  //replace is boolean, if true, push
  //if false, replace
  const push = (element, replace) => {
    state.lastElement = element;
    if (!replace) {
      state.elements = [...state.elements, element];
    } else {
      state.elements = [
        ...state.elements.slice(0, state.elements.length - 1),
        element,
      ];
    }
  };

  //removes most recent item added
  const pop = () => {
    //making a copy minus the last element
    //won't cause a side effect of modifying the original array
    if (state.elements.length > 0) {
      state.elements = [...state.elements.slice(0, state.elements.length - 1)];
      state.lastElement = state.elements[state.elements.length - 1];
    }
  };

  replace = (element) => {
    //remove last element, add the new element
    state.elements = [
      ...state.elements.slice(0, state.elements.length - 1),
      element,
    ];
    state.lastElement = element;
  };

  return {
    state,
    push,
    pop,
    replace,
  };
};

const history = useVisualMode("SHOW");
history.push("SAVE");
history.push("CONFIRM");
history.pop();
history.push("ERROR", true);
