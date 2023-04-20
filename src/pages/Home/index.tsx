import { HomeContainer, StartCountDownButton, StopCountDownButton } from './styles';

import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { HandPalm, Play } from 'phosphor-react';

import { CyclesContext } from '../../contexts/CyclesContext';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Input a task'),
  minuteAmount: zod.number().min(1).max(60),
});

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
 
const {activeCycle, interruptCurrentCycle, createNewCycle} = useContext(CyclesContext);

  const newCycleForm = useForm<INewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minuteAmount: 0,
    },
  });

  const { handleSubmit, watch } = newCycleForm;

  const hasTask = watch('task');
  const isSubmitDisabled: boolean = !hasTask ? true : false;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} /> Stop
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Start
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
