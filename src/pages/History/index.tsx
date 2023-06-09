import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

import { formatDistanceToNow } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

export function History() {

  const { cycles } = useContext(CyclesContext);

  return <HistoryContainer>
    <h1>My History</h1>
    <HistoryList>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Duration</th>
            <th>Started</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minuteAmount} minutes</td>
                  <td>{formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR
                  })}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Done</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}
                    {(!cycle.finishedDate && !cycle.interruptedDate) && (
                      <Status statusColor="yellow">In Progress</Status>
                    )}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </HistoryList>
  </HistoryContainer>
}