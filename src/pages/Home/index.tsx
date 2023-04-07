import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput
} from "./styles";

import { Play } from "phosphor-react";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I goto Work</label>
          <TaskInput 
            id="task" 
            type="text"
            list="task-suggestions" 
            placeholder="Give a name for the project"
          />

          <datalist id="task-suggestions">
            <option value="Project 1"></option>
            <option value="Project 2"></option>
            <option value="Project 3"></option>
            <option value="Project 4"></option>
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />
          <span>seconds.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit"> <Play size={24} /> Start</StartCountDownButton>
      </form>
    </HomeContainer>
  )
}