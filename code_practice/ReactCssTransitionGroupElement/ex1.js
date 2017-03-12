//.....


return (
  <div>
  <ReactCSSTransitionGroup
  transitionName="name"
  transitionEnterTimeout={300}
  transitionLeaveTimeout={300}
  >
    {items}

  </ReactCSSTransitionGroup>
  </div>



)

//explain: ReactCSSTransitionGroup element must be inserted around the children elements that you want to animate
/*
transitionName: will be mapped to CSS class name contain the actual animation
transitionEnterTimeout:animation duration


We have class
.name-enter{}
.name-enter-action{}
.name-leave{}

*/
