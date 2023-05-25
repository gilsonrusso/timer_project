import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I goto Work</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Give a name for the project"
        disabled={!!activeCycle}
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
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minuteAmount', { valueAsNumber: true })}
      />
      <span>seconds.</span>
    </FormContainer>
  );
}
