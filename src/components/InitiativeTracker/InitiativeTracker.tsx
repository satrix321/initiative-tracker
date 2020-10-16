import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { FaLongArrowAltDown } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import CustomMenu from '../CustomMenu/CustomMenu';
import CustomMenuOption from '../CustomMenu/CustomMenuOption/CustomMenuOption';
import InitiativeTrackerEntry from './InitiativeTrackerEntry/InitiativeTrackerEntry';

import update from 'immutability-helper';

class TrackerEntry {
  id: number;
  name: string;
  hp: string;
  initiative: number;
  isGunReady: boolean;
  marked: boolean;

  constructor(id: number, name: string, hp: string, initiative: number) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.initiative = initiative;
    this.isGunReady = false;
    this.marked = false;
  }
}

const Container = styled.div`
  padding: ${props => props.theme.spacings.p12};
`;

const TrackerBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${props => props.theme.spacings.p12} 0;
  border-top: 1px solid ${props => props.theme.colors.greyLight2};
  border-bottom: 1px solid ${props => props.theme.colors.greyLight2};
`;

const TrackerData = styled.div`
  width: 100%;
  border-spacing: 0;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${props => props.theme.spacings.p4};
`;

const Title = styled.span`
  flex-grow: 2;
  margin: ${props => props.theme.spacings.p4};
  font-size: ${props => props.theme.fontSizes.veryLarge};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${props => props.theme.spacings.p4};
`;

const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.spacings.p48};
`;

const InitiativeTracker: React.FC = () => {
  const isGunReadyInitiative = 50;

  let initialEntries: TrackerEntry[] = [];
  let initialIdCounter = 0;

  const localStorageEntries = window.localStorage.getItem('trackerEntries');
  if (localStorageEntries) {
    initialEntries = JSON.parse(localStorageEntries);
  }
  const localStorageIdCounter = window.localStorage.getItem('trackerIdCounter');
  if (localStorageIdCounter) {
    initialIdCounter = Number(localStorageIdCounter);
  }

  const [gunReadinessEnabled, setGunReadinessEnabled] = useState(false);
  const [idCounter, setIdCounter] = useState(initialIdCounter);
  const [newEntryName, setNewEntryName] = useState('');
  const [newEntryHp, setNewEntryHp] = useState('');
  const [newEntryInitiative, setNewEntryInitiative] = useState(0);
  const [entries, setEntries] = useState<TrackerEntry[]>(initialEntries);

  const handleTurn = () => {
    if (entries.length > 0) {
      let tempArray = [...entries];
      let entry = tempArray.shift()!;
      tempArray.push(entry);
      setEntries(tempArray);
      window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
    }
  }

  const sortEntries = (entries: TrackerEntry[]) => {
    if (entries.length > 0) {
      let sortedEntries = [...entries].sort((firstEntry: TrackerEntry, secondEntry: TrackerEntry) => {
        return (secondEntry.initiative + (secondEntry.isGunReady ? isGunReadyInitiative : 0)) - (firstEntry.initiative + (firstEntry.isGunReady ? isGunReadyInitiative : 0));
      });

      sortedEntries = sortedEntries.map((entry) => { return {...entry, marked: false};});
      sortedEntries[sortedEntries.length - 1].marked = true;

      return sortedEntries;
    } else {
      return entries;
    }
  }

  const addEntry = () => {
    if (newEntryName && newEntryInitiative) {
      let newEntry = new TrackerEntry(idCounter, newEntryName, newEntryHp, newEntryInitiative);
      let tempArray = [...entries, newEntry];

      setEntries(tempArray);
      window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
      setNewEntryName('');
      setNewEntryHp('');
      setNewEntryInitiative(0);
      setIdCounter(idCounter + 1);
      window.localStorage.setItem('trackerIdCounter', String(idCounter + 1));
    }
  }

  const removeEntry = (id: number) => {
    const tempArray = entries.filter((entry: TrackerEntry) => {
      return entry.id !== id;
    });
    setEntries(tempArray);
    window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
  }

  const toggleEditEntry = (id: number, name: string, hp: string, initiative: number) => {
    let tempArray = [...entries];
    let entry = tempArray.find((entry: TrackerEntry) => {
      return entry.id === id;
    });

    if (entry) {
      entry.name = name;
      entry.hp = hp;
      entry.initiative = initiative;
      setEntries(tempArray);
      window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
    }
  }

  const toggleGunReady = (id: number) => {
    let tempArray = [...entries];
    let filteredEntry = tempArray.find((entry: TrackerEntry) => {
      return entry.id === id;
    })!;
    filteredEntry.isGunReady = !filteredEntry.isGunReady;
    setEntries(tempArray);
    window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
  }

  const moveEntryUp = (id: number) => {
    if (entries.length >= 2) {
      let tempArray: TrackerEntry[] = [...entries];
      let entryIndex: number = entries.findIndex((entry: TrackerEntry) => {
        return entry.id === id;
      });
      if (entryIndex === -1) {
        return;
      } else if (entryIndex === 0) {
        let entry = tempArray.shift()!;
        tempArray.push(entry);
      } else {
        let previousEntryIndex: number = entryIndex - 1;
        let entry = tempArray.splice(entryIndex, 1);
        tempArray.splice(previousEntryIndex, 0, entry[0]);
      }
      setEntries(tempArray);
      window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
    }
  }

  const moveEntryDown = (id: number) => {
    if (entries.length >= 2) {
      if (entries.length >= 2) {
        let tempArray: TrackerEntry[] = [...entries];
        let entryIndex: number = entries.findIndex((entry: TrackerEntry) => {
          return entry.id === id;
        });
        if (entryIndex === -1) {
          return;
        } else if (entryIndex === entries.length - 1) {
          let entry = tempArray.pop()!;
          tempArray.unshift(entry);
        } else {
          let nextEntryIndex: number = entryIndex + 1;
          let entry = tempArray.splice(nextEntryIndex, 1);
          tempArray.splice(entryIndex, 0, entry[0]);
        }
        setEntries(tempArray);
        window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
      }
    }
  }

  const clear = () => {
    setEntries([]);
    setIdCounter(0);
    window.localStorage.setItem('trackerEntries', JSON.stringify([]));
    window.localStorage.setItem('trackerIdCounter', JSON.stringify(0));
  }

  const moveEntry = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragEntry = entries[dragIndex];
      const tempArray = update(entries, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragEntry],
        ],
      });
      setEntries(tempArray);
      window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray));
    },
    [entries],
  )

  return (
    <Container>
      <Header>
        <Title>Initiative Tracker</Title>
        <CustomButton
          icon
          disabled={entries.length < 2}
          title="Turn"
          onClick={handleTurn}
        >
          <FaLongArrowAltDown size="1.25em" />
        </CustomButton>
        <CustomButton
          icon
          disabled={entries.length === 0}
          title="Sort"
          onClick={() => { const tempArray = sortEntries(entries); setEntries(tempArray); window.localStorage.setItem('trackerEntries', JSON.stringify(tempArray)); }}
        >
          <FaSortAmountDown size="1.25em" />
        </CustomButton>
        <CustomButton
          icon
          disabled={entries.length === 0}
          title="Clear"
          onClick={clear}
        >
          <FaTimes size="1.25em" />
        </CustomButton>
        <CustomMenu
          activatorIcon
          activatorContent={<FaCog size="1.25em" />}
        >
          <CustomMenuOption
            onClick={() => {setGunReadinessEnabled(!gunReadinessEnabled)}}
            clicked={gunReadinessEnabled}
          >
            Call of Cthulhu
          </CustomMenuOption>
        </CustomMenu>
      </Header>
      <TrackerBody>
        {entries.length > 0
          ? <div style={{width: '100%'}}>
              <TrackerData>
                {entries
                  .map((entry: TrackerEntry, index: number) => {
                    return (
                      <InitiativeTrackerEntry
                        key={entry.id}
                        id={entry.id}
                        index={index}
                        name={entry.name}
                        hp={entry.hp}
                        initiative={entry.initiative}
                        isGunReady={entry.isGunReady}
                        marked={entry.marked}
                        gunReadinessEnabled={gunReadinessEnabled}
                        onToggleGunReady={toggleGunReady}
                        onEditEntry={toggleEditEntry}
                        onRemoveEntry={removeEntry}
                        onMoveEntryUp={moveEntryUp}
                        onMoveEntryDown={moveEntryDown}
                        onMove={moveEntry}
                      />
                    )
                  })
                }
              </TrackerData>
            </div>
          : <NoDataMessage>No Data</NoDataMessage>  
        }
      </TrackerBody>
      <Footer>
        <CustomInput
          label="Name"
          type="text"
          value={newEntryName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewEntryName(event.target.value)}
        />
        <CustomInput
          label="HP"
          type="text"
          value={newEntryHp}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewEntryHp(event.target.value)}
        />
        <CustomInput
          label="Initiative"
          type="number"
          value={newEntryInitiative}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewEntryInitiative(Number(event.target.value))}
        />
        <CustomButton
          icon
          disabled={!Boolean(newEntryName) || !Boolean(newEntryInitiative)}
          onClick={addEntry}
          title="Add record"
        >
          <FaPlus size="1.25em"/>
        </CustomButton>
      </Footer>
    </Container>
  );
}

export default InitiativeTracker;
