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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Input a task'),
  minuteAmount: zod.number().min(5).max(60)
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

  const { register, handleSubmit, watch } = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minuteAmount: 0
    }
  });

  function handlerCreateNewCycle(data: any): void {
    console.log('data >>>', data);
  }

  const hasTask = watch('task');
  const isSubmitDisabled: boolean = !hasTask ?  true : false;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handlerCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I goto Work</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Give a name for the project"
            {...register('task')}
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
            {...register('minuteAmount', { valueAsNumber: true })}
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

        <StartCountDownButton disabled={isSubmitDisabled} type="submit"> <Play size={24} /> Start</StartCountDownButton>
      </form>
    </HomeContainer>
  )
}