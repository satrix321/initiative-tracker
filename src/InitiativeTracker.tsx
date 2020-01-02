import React, { useState } from 'react';
import './InitiativeTracker.scss';

import { FaLongArrowAltDown } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { GiPistolGun } from "react-icons/gi";

import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomButtonGroup from './CustomButtonGroup';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';

import { useDrag, useDrop, DragObjectWithType } from 'react-dnd'

class InitiativeTrackerEntry {
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
  const [entries, setEntries] = useState<InitiativeTrackerEntry[]>([]);

  const handleTurn = () => {
    if (entries.length > 0) {
      let tempArray = [...entries];
      let entry = tempArray.shift()!;
      tempArray.push(entry);
      setEntries(tempArray);
    }
  }

  const sortEntries = (entries: InitiativeTrackerEntry[]) => {
    if (entries.length > 0) {
      return [...entries].sort((firstEntry: InitiativeTrackerEntry, secondEntry: InitiativeTrackerEntry) => {
        return (secondEntry.initiative + (secondEntry.isGunReady ? isGunReadyInitiative : 0)) - (firstEntry.initiative + (firstEntry.isGunReady ? isGunReadyInitiative : 0));
      });
    } else {
      return entries;
    }
  }

  const addEntry = () => {
    if (newEntryName && newEntryInitiative) {
      let newEntry = new InitiativeTrackerEntry(idCounter, newEntryName, newEntryHp, newEntryInitiative);
      let tempArray = [...entries, newEntry];

      setEntries(tempArray);
      setNewEntryName('');
      setNewEntryHp('');
      setNewEntryInitiative(0);
      setIdCounter(idCounter + 1);
    }
  }

  const removeEntry = (id: number) => {
    setEntries(entries.filter((entry: InitiativeTrackerEntry) => {
      return entry.id !== id;
    }))
  }

  const toggleEditEntry = (id: number) => {
    let tempArray = [...entries];
    let entry = tempArray.find((entry: InitiativeTrackerEntry) => {
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
      setEntries(tempArray);
      setEditedEntryName(entry.name);
      setEditedEntryHp(entry.hp);
      setEditedEntryInitiative(entry.initiative);
    }
  }

  const toggleGunReady = (id: number) => {
    let tempArray = [...entries];
    let filteredEntry = tempArray.find((entry: InitiativeTrackerEntry) => {
      return entry.id === id;
    })!;
    filteredEntry.isGunReady = !filteredEntry.isGunReady;
    setEntries(tempArray);
  }

  const moveEntryUp = (id: number) => {
    if (entries.length >= 2) {
      let tempArray: InitiativeTrackerEntry[] = [...entries];
      let entryIndex: number = entries.findIndex((entry: InitiativeTrackerEntry) => {
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
        let tempArray: InitiativeTrackerEntry[] = [...entries];
        let entryIndex: number = entries.findIndex((entry: InitiativeTrackerEntry) => {
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

  return (
    <div className="initiative-tracker">
      <div className="initiative-tracker__header">
        <span className="initiative-tracker__header-title">Initiative Tracker</span>
        <CustomButton icon ariaLabel="Turn" onClick={handleTurn}><FaLongArrowAltDown size="1.25em" /></CustomButton>
        <CustomButton icon ariaLabel="Sort" onClick={() => setEntries(sortEntries(entries))}><FaSortAmountDown size="1.25em" /></CustomButton>
        <CustomButton icon ariaLabel="Clear" onClick={() => setEntries([])}><FaTimes size="1.25em" /></CustomButton>
      </div>
      <div className="initiative-tracker__body">
        {(() => {
          if (entries.length > 0) {
            return (
              <div style={{width: '100%'}}>
                <div className="initiative-tracker__data">
                  {entries
                    .map((entry: InitiativeTrackerEntry) => {
                      return (
                        <div className="initiative-tracker__entry" key={entry.id} data-id={entry.id} id={`entry_${entry.id}`}>
                          <div className="initiative-tracker__name-column">
                            <div className="initiative-tracker__column-label">Name</div>
                            <div>
                              {(() => {
                                if (!entry.editMode) {
                                  return entry.name;
                                } else {
                                  return (
                                    <CustomInput
                                      fullWidth
                                      type="text"
                                      defaultValue={entry.name}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryName(event.target.value)}
                                    />
                                  );
                                }
                              })()}
                            </div>
                          </div>
                          <div className="initiative-tracker__hp-column">
                            <div className="initiative-tracker__column-label">HP</div>
                            <div>
                              {(() => {
                                if (!entry.editMode) {
                                  return entry.hp;
                                } else {
                                  return (
                                    <CustomInput
                                      fullWidth
                                      type="text"
                                      defaultValue={entry.hp}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryHp(event.target.value)}
                                    />
                                  );
                                }
                              })()}
                            </div>
                          </div>
                          <div className="initiative-tracker__initiative-column">
                            <div className="initiative-tracker__column-label">Initiative</div>
                            <div>
                              {(() => {
                                if (!entry.editMode) {
                                  return entry.isGunReady ? `${entry.initiative} (+${isGunReadyInitiative})` : entry.initiative;
                                } else {
                                  return (
                                    <CustomInput
                                      fullWidth
                                      type="number"
                                      defaultValue={entry.initiative}
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryInitiative(Number(event.target.value))}
                                    />
                                  );
                                }
                              })()}
                            </div>
                          </div>
                          <div className="initiative-tracker__actions-column">
                            <div className="initiative-tracker__actions-container initiative-tracker__actions-container--desktop-only">
                              <CustomButtonGroup>
                                <CustomButton
                                  icon
                                  secondary
                                  onClick={moveEntryUp.bind({}, entry.id)}
                                  ariaLabel="Move up"
                                >
                                  <FaChevronUp />
                                </CustomButton>
                                <CustomButton
                                  icon
                                  secondary
                                  onClick={moveEntryDown.bind({}, entry.id)}
                                  ariaLabel="Move down"
                                >
                                  <FaChevronDown />
                                </CustomButton>
                              </CustomButtonGroup>
                              <CustomButton
                                icon
                                secondary
                                clicked={entry.isGunReady}
                                onClick={toggleGunReady.bind(undefined, entry.id)}
                                ariaLabel="Gun ready"
                              >
                                <GiPistolGun size="1.75em" />
                              </CustomButton>
                              <CustomButton
                                icon
                                secondary
                                clicked={entry.editMode}
                                onClick={toggleEditEntry.bind(undefined, entry.id)}
                                ariaLabel="Edit mode"
                              >
                                <FaPen size="1.25em" />
                              </CustomButton>
                              <CustomButton
                                icon
                                secondary
                                onClick={removeEntry.bind(undefined, entry.id)}
                                ariaLabel="Remove entry"
                              >
                                <FaTimes size="1.25em" />
                              </CustomButton>
                            </div>
                            <div className="initiative-tracker__actions-container initiative-tracker__actions-container--mobile-only">
                              <CustomButtonGroup>
                                <CustomButton
                                  icon
                                  secondary
                                  onClick={moveEntryUp.bind({}, entry.id)}
                                  ariaLabel="Move up"
                                >
                                  <FaChevronUp />
                                </CustomButton>
                                <CustomButton
                                  icon
                                  secondary
                                  onClick={moveEntryDown.bind({}, entry.id)}
                                  ariaLabel="Move down"
                                >
                                  <FaChevronDown />
                                </CustomButton>
                              </CustomButtonGroup>
                              <CustomMenu
                                activatorIcon
                                activatorSecondary
                                activatorContent={<FaChevronDown size="1.25em" />}
                              >
                                <CustomMenuItem
                                  onClick={toggleGunReady.bind(undefined, entry.id)}
                                  clicked={entry.isGunReady}
                                >
                                  Gun
                                </CustomMenuItem>
                                <CustomMenuItem
                                  onClick={toggleEditEntry.bind(undefined, entry.id)}
                                  clicked={entry.editMode}
                                >
                                  Edit
                                </CustomMenuItem>
                                <CustomMenuItem
                                  onClick={removeEntry.bind(undefined, entry.id)}
                                >
                                  Delete
                                </CustomMenuItem>
                              </CustomMenu>
                            </div>
                          </div>
                        </div>
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
