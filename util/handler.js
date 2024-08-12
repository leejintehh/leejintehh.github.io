
// current input
export const players={
  player1:'jl',
  player2:'trist',
  player3:'jin',
  player4:'fer'
};

export const balance={}
balance[players.player1]=[]
balance[players.player2]=[]
balance[players.player3]=[]
balance[players.player4]=[]

//

const biteAmt=.2;
const gangAmt=.6;
const oneTai=.2;


export var currentState = {
  currentPlayer:[],  
  currentAn:'',
  currentAction:'',
  currentTai:0,
};

export function currentInputPrinter(state){
  var {currentPlayer, currentAn, currentAction, currentTai} = state
  if (currentTai==0) {currentTai=''}
  switch(state.currentPlayer.length) {
    case 0:
      return currentAn +' '+ currentAction +' '+ currentTai
    case 1:
      return currentPlayer[0] +' '+ currentAn +' '+ currentAction +' '+ currentTai
    case 2:
      return currentPlayer[0] +' '+ currentAn +' '+ currentAction +' '+ currentTai +' '+ currentPlayer[1]
  }
}

export function balancePrinter(balance){
  let res=''
  for (const [key, value] of Object.entries(balance)) {
    res+=key+':'
    res+= Math.round(value.reduce((a, b) => a + b, 0)*100)/100 + '\t'
  }
  return res
}

// logic
const handlePlayer = (value,state) => {
  resetState=currentState = {
  currentPlayer:[],  
  currentAn:'',
  currentAction:'',
  currentTai:0}
  if (state.currentPlayer.includes(value)){
    const index=state.currentPlayer.indexOf(value)
    state.currentPlayer.splice(index,1)
    return state
    }
  else if (state.currentPlayer.length<2) {
    state.currentPlayer.push(value)
    return state
  }
  else {return resetState}
}

const handleAn = (value,state) => {
  if (state.currentAn=='') {
    state.currentAn='an'
  }
  else{
    state.currentAn=''
  }
  return state
}

const handleTai = (value,state) => {
  if (state.currentTai==value){
    state.currentTai=0
  }
  else{state.currentTai=value}
  return state
}


const handleAction = (value,state) => {
  if (state.currentAction=='') {
    state.currentAction=value
  }
  else if (state.currentAction==value){
    state.currentAction=''
  }
  else{
    state.currentAction=value
  }
  return state
}

const twoUpdater = (amount,state) => {
  for (const [key, value] of Object.entries(balance)) {
    if (key==state.currentPlayer[0]) {
      value.push(amount)
    }
    else if (key==state.currentPlayer[1]) {
      value.push(-amount)
    }
    else {
      value.push(0)
    }
  } 
  return state,balance
}


const multiUpdater = (amount,state) => {
  // const {currentPlayer, currentAn, currentAction, currentTai} =
  for (const [key, value] of Object.entries(balance)) {
    if (key==state.currentPlayer[0]) {
      value.push(amount*3)
    }
    else {
      value.push(-amount)
    }
  } 
  return state,balance
}

const handleDone = (state) => {
  const {currentPlayer, currentAn, currentAction, currentTai} = state
  
  let amount=0
  if (currentPlayer.length==1){
    if (currentAction!=''){amount=biteAmt}
    if (currentAn!=''){amount=amount*2}
    else if(currentTai!=0) {amount=oneTai*(2**(currentTai-1))}
    multiUpdater(amount,state)
  }

  else if (currentPlayer.length==2){
    if (currentAction=='gang'){amount=gangAmt}
    else if (currentAction=='bite'){amount=biteAmt}
    if (currentAn!=''){amount=amount*2}
    else if(currentTai!=0) {amount=oneTai*(2**(currentTai))}
    twoUpdater(amount,state)
  }
  return state,balance
}


const handleOperation = (value,state) => {
  resetState=currentState = {
  currentPlayer:[],  
  currentAn:'',
  currentAction:'',
  currentTai:0}

  if (value=='clear') {
    return resetState
  }
  else if (value=='undo'){
    for (const [key, value] of Object.entries(balance)) {
      value.pop();
    }
  return balance
  }
  else if (value =='done'){
    return handleDone(state),resetState
  }
}

// handler function
const handler = (type, value, state) => {
  switch (type) {
    case "player":
      return handlePlayer(value, state);
    case "an":
      return handleAn(value,state);
    case "action":
      return handleAction(value,state);
    case "tai":
      return handleTai(value,state);
    case "operation":
      return handleOperation(value,state);
  }
};

export default handler;
