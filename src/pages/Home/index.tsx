import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Input a task'),
  minuteAmount: zod.number().min(5).max(60),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minuteAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minuteAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  function handlerCreateNewCycle(data: INewCycleFormData): void {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    setAmountSecondsPassed(0);

    reset();
  }

  const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds]);

  const hasTask = watch('task');
  const isSubmitDisabled: boolean = !hasTask ? true : false;

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          {' '}
          <Play size={24} /> Start
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
