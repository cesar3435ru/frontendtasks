// import { State, Action, StateContext } from '@ngxs/store';

// export class SetButtonClicked {
//   static readonly type = '[Button] Set Button Clicked';
//   constructor(public payload: boolean) {}
// }

// @State<boolean>({
//   name: 'isButtonClicked',
//   defaults: false
// })
// export class YourState {
//   @Action(SetButtonClicked)
//   setButtonClicked({ setState }: StateContext<boolean>, { payload }: SetButtonClicked) {
//     setState(payload);
//   }
// }



// your-state.state.ts

import { State, Action, StateContext } from '@ngxs/store';

export class SetButtonClicked {
  static readonly type = '[Button] Set Button Clicked';
  constructor(public payload: boolean) {}
}

@State<boolean>({
  name: 'isButtonClicked',
  defaults: false
})
export class YourState {
  @Action(SetButtonClicked)
  setButtonClicked({ setState }: StateContext<boolean>, { payload }: SetButtonClicked) {
    setState(payload);
  }
}

