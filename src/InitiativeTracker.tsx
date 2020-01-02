import React, { useState, useCallback } from 'react';
import './InitiativeTracker.scss';

import { FaLongArrowAltDown } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import InitiativeTrackerEntry from './InitiativeTrackerEntry';
import update from 'immutability-helper';

class TrackerEntry {
  id: number;
  name: string;
  hp: string;
  initiative: number;
  isGunReady: boolean;
  editMode: boolean;

  constructor(id: number, name: string, hp: string, initiative: number) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.initiative = initiative;
    this.isGunReady = false;
    this.editMode = false;
  }
}

const InitiativeTracker: React.FC = () => {
  const isGunReadyInitiative = 50;

  const [idCounter, setIdCounter] = useState(0);
  const [newEntryName, setNewEntryName] = useState('');
  const [newEntryHp, setNewEntryHp] = useState('');
  const [newEntryInitiative, setNewEntryInitiative] = useState(0);
  const [editedEntryName, setEditedEntryName] = useState('');
  const [editedEntryHp, setEditedEntryHp] = useState('');
  const [editedEntryInitiative, setEditedEntryInitiative] = useState(0);
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  const handleTurn = () => {
    if (entries.length > 0) {
      let tempArray = [...entries];
      let entry = tempArray.shift()!;
      tempArray.push(entry);
      setEntries(tempArray);
    }
  }

  const sortEntries = (entries: TrackerEntry[]) => {
    if (entries.length > 0) {
      return [...entries].sort((firstEntry: TrackerEntry, secondEntry: TrackerEntry) => {
        return (secondEntry.initiative + (secondEntry.isGunReady ? isGunReadyInitiative : 0)) - (firstEntry.initiative + (firstEntry.isGunReady ? isGunReadyInitiative : 0));
      });
    } else {
      return entries;
    }
  }

  const addEntry = () => {
    if (newEntryName && newEntryInitiative) {
      let newEntry = new TrackerEntry(idCounter, newEntryName, newEntryHp, newEntryInitiative);
      let tempArray = [...entries, newEntry];

      setEntries(tempArray);
      setNewEntryName('');
      setNewEntryHp('');
      setNewEntryInitiative(0);
      setIdCounter(idCounter + 1);
    }
  }

  const removeEntry = (id: number) => {
    setEntries(entries.filter((entry: TrackerEntry) => {
      return entry.id !== id;
    }))
  }

  const toggleEditEntry = (id: number) => {
    let tempArray = [...entries];
    let entry = tempArray.find((entry: TrackerEntry) => {
      return entry.id === id;
    })!;

    if (entry.editMode) {
      entry.name = editedEntryName;
      entry.hp = editedEntryHp;
      entry.initiative = editedEntryInitiative;
      entry.editMode = !entry.editMode;
      setEntries(tempArray);
    } else {
      entry.editMode = !entry.editMode;
      setEditedEntryName(entry.name);
      setEditedEntryHp(entry.hp);
      setEditedEntryInitiative(entry.initiative);
    }
  }

  const toggleGunReady = (id: number) => {
    let tempArray = [...entries];
    let filteredEntry = tempArray.find((entry: TrackerEntry) => {
      return entry.id === id;
    })!;
    filteredEntry.isGunReady = !filteredEntry.isGunReady;
    setEntries(tempArray);
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
      }
    }
  }

  const moveEntry = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragEntry = entries[dragIndex];
      setEntries(
        update(entries, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragEntry],
          ],
        }),
      )
    },
    [entries],
  )

  return (
    <div className="initiative-tracker">
      <div className="initiative-tracker__header">
        <span className="initiative-tracker__header-title">Initiative Tracker</span>
        <CustomButton
          icon
          ariaLabel="Turn"
          onClick={handleTurn}
        >
          <FaLongArrowAltDown size="1.25em" />
        </CustomButton>
        <CustomButton
          icon
          ariaLabel="Sort"
          onClick={() => setEntries(sortEntries(entries))}
        >
          <FaSortAmountDown size="1.25em" />
        </CustomButton>
        <CustomButton
          icon
          ariaLabel="Clear"
          onClick={() => setEntries([])}
        >
          <FaTimes size="1.25em" />
        </CustomButton>
      </div>
      <div className="initiative-tracker__body">
        {(() => {
          if (entries.length > 0) {
            return (
              <div style={{width: '100%'}}>
                <div className="initiative-tracker__data">
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
                </div>
              </div>
            );
          } else {
            return <div className="initiative-tracker__no-data">No Data</div>
          }
        })()}
      </div>
      <div className="initiative-tracker__footer">
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
          onClick={addEntry}
          ariaLabel="Add record"
        >
          <FaPlus size="1.25em"/>
        </CustomButton>
      </div>
    </div>
  );
}

export default InitiativeTracker;
