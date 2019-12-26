import React from 'react';
import './InitiativeTracker.scss';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { GiPistolGun } from "react-icons/gi";

import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomButtonGroup from './CustomButtonGroup';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';

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

class InitiativeTracker extends React.Component {
  idCounter: number;
  state: {
    addEntryName: string,
    addEntryHp: string,
    addEntryInitiative: number,
    editEntryName: string,
    editEntryHp: string,
    editEntryInitiative: number,
    entries: InitiativeTrackerEntry[],
  };
  isGunReadyInitiative: number = 50;

  constructor(props: any) {
    super(props);
    this.idCounter = 0;
    this.state = {
      addEntryName: '',
      addEntryHp: '',
      addEntryInitiative: 0,
      editEntryName: '',
      editEntryHp: '',
      editEntryInitiative: 0,
      entries: [],
    };

    this.setAddEntryName = this.setAddEntryName.bind(this);
    this.setAddEntryHp = this.setAddEntryHp.bind(this);
    this.setAddEntryInitiative = this.setAddEntryInitiative.bind(this);

    this.setEditEntryName = this.setEditEntryName.bind(this);
    this.setEditEntryHp = this.setEditEntryHp.bind(this);
    this.setEditEntryInitiative = this.setEditEntryInitiative.bind(this);
  }

  render() {
    return (
      <div className="initiative-tracker">
        <div className="initiative-tracker__header">
          <span className="initiative-tracker__header-title">Initiative Tracker</span>
          <CustomButton onClick={this.handleTurn}>Turn</CustomButton>
          <CustomButton onClick={this.handleSort}>Sort</CustomButton>
          <CustomButton onClick={this.handleClear}>Clear</CustomButton>
        </div>
        <div className="initiative-tracker__body">
          {(() => {
            if (this.state.entries.length > 0) {
              return (
                <table className="initiative-tracker__table" cellPadding="0">
                  <thead>
                    <tr>
                      <th align="left">Name</th>
                      <th align="left" className="initiative-tracker__hp-header">HP</th>
                      <th align="left" className="initiative-tracker__initiative-header">Initiative</th>
                      <th className="initiative-tracker__actions-header">Actions</th>
                    </tr>
                  </thead>
                  {this.renderEntries()}
                </table>
              );
            } else {
              return <div className="initiative-tracker__no-data">No Data</div>
            }
          })()}
        </div>
        <div className="initiative-tracker__footer">
          <CustomInput label="Name" type="text" value={this.state.addEntryName} onChange={this.setAddEntryName}/>
          <CustomInput label="HP" type="text" value={this.state.addEntryHp} onChange={this.setAddEntryHp}/>
          <CustomInput label="Initiative" type="number" value={this.state.addEntryInitiative} onChange={this.setAddEntryInitiative}/>
          <CustomButton icon onClick={this.addEntry} ariaLabel="Add record">
            <IoIosAdd size="2em"/>
          </CustomButton>
        </div>
      </div>
    );
  }

  renderEntries() {
    return (
      <tbody>
        {this.state.entries
          .map((entry: InitiativeTrackerEntry) => (
            <tr key={entry.id} data-id={entry.id} id={`entry_${entry.id}`}>
              <td>
                {(() => {
                  if (!entry.editMode) {
                    return entry.name;
                  } else {
                    return <CustomInput fullWidth type="text" defaultValue={entry.name} onChange={this.setEditEntryName}/>
                  }
                })()}
              </td>
              <td>
                {(() => {
                  if (!entry.editMode) {
                    return entry.hp;
                  } else {
                    return <CustomInput fullWidth type="text" defaultValue={entry.hp} onChange={this.setEditEntryHp}/>
                  }
                })()}
              </td>
              <td>
                {(() => {
                  if (!entry.editMode) {
                    return entry.isGunReady ? `${entry.initiative} (+${this.isGunReadyInitiative})` : entry.initiative;
                  } else {
                    return <CustomInput fullWidth type="number" defaultValue={entry.initiative} onChange={this.setEditEntryInitiative}/>
                  }
                })()}
              </td>
              <td>
                <div className="initiative-tracker__actions-container initiative-tracker__actions-container--desktop-only">
                  <CustomButton
                    icon
                    secondary
                    clicked={entry.isGunReady}
                    onClick={this.toggleGun.bind(this, entry.id)}
                    ariaLabel="Gun ready"
                  >
                    <GiPistolGun size="1.5em" />
                  </CustomButton>
                  <CustomButtonGroup>
                    <CustomButton
                      icon
                      secondary
                      onClick={this.moveEntryUp.bind(this, entry.id)}
                      ariaLabel="Move up"
                    >
                      <IoIosArrowUp />
                    </CustomButton>
                    <CustomButton
                      icon
                      secondary
                      onClick={this.moveEntryDown.bind(this, entry.id)}
                      ariaLabel="Move down"
                    >
                      <IoIosArrowDown />
                    </CustomButton>
                  </CustomButtonGroup>
                  <CustomButton
                    icon
                    secondary
                    clicked={entry.editMode}
                    onClick={this.toggleEditEntry.bind(this, entry.id)}
                    ariaLabel="Edit mode"
                  >
                    <IoMdCreate size="1.5em" />
                  </CustomButton>
                  <CustomButton
                    icon
                    secondary
                    onClick={this.removeEntry.bind(this, entry.id)}
                    ariaLabel="Remove entry"
                  >
                    <IoIosClose size="2em" />
                  </CustomButton>
                </div>
                <div className="initiative-tracker__actions-container initiative-tracker__actions-container--mobile-only">
                  <CustomButtonGroup>
                    <CustomButton icon secondary onClick={this.moveEntryUp.bind(this, entry.id)} ariaLabel="Move up">
                      <IoIosArrowUp />
                    </CustomButton>
                    <CustomButton icon secondary onClick={this.moveEntryDown.bind(this, entry.id)} ariaLabel="Move down">
                      <IoIosArrowDown />
                    </CustomButton>
                  </CustomButtonGroup>
                  <CustomMenu
                    activatorIcon
                    activatorSecondary
                    activatorContent={<IoIosArrowDown size="1.5em" />}
                  >
                    <CustomMenuItem onClick={this.toggleGun.bind(this, entry.id)} clicked={entry.isGunReady}>Gun</CustomMenuItem>
                    <CustomMenuItem onClick={this.toggleEditEntry.bind(this, entry.id)} clicked={entry.editMode}>Edit</CustomMenuItem>
                    <CustomMenuItem onClick={this.removeEntry.bind(this, entry.id)}>Delete</CustomMenuItem>
                  </CustomMenu>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  setAddEntryName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ addEntryName: event.target.value });
  }

  setAddEntryHp(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ addEntryHp: event.target.value });
  }

  setAddEntryInitiative(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ addEntryInitiative: Number(event.target.value) });
  }

  setEditEntryName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editEntryName: event.target.value });
  }

  setEditEntryHp(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editEntryHp: event.target.value });
  }

  setEditEntryInitiative(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ editEntryInitiative: Number(event.target.value) });
  }

  addEntry = () => {
    if (this.state.addEntryName && this.state.addEntryInitiative) {
      let newEntry = new InitiativeTrackerEntry(this.idCounter, this.state.addEntryName, this.state.addEntryHp, this.state.addEntryInitiative);
      let tempArray = [...this.state.entries, newEntry];

      this.setState({
        entries: tempArray,
        addEntryName: '',
        addEntryHp: '',
        addEntryInitiative: 0,
      });
      this.idCounter++;
    }
  }

  sortEntries = (entries: InitiativeTrackerEntry[]) => {
    if (entries.length > 0) {
      return [...entries].sort((firstEntry: InitiativeTrackerEntry, secondEntry: InitiativeTrackerEntry) => {
        return (secondEntry.initiative + (secondEntry.isGunReady ? this.isGunReadyInitiative : 0)) - (firstEntry.initiative + (firstEntry.isGunReady ? this.isGunReadyInitiative : 0));
      });
    } else {
      return entries;
    }
  }

  toggleGun(id: number) {
    let tempArray = [...this.state.entries];
    let entry = tempArray.find((entry: InitiativeTrackerEntry) => {
      return entry.id === id;
    })!;
    entry.isGunReady = !entry.isGunReady;
    this.setState({ entries: tempArray });
  }

  moveEntryUp(id: number) {
    if (this.state.entries.length >= 2) {
      let tempArray: InitiativeTrackerEntry[] = [...this.state.entries];
      let entryIndex: number = this.state.entries.findIndex((entry: InitiativeTrackerEntry) => {
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
      this.setState({ entries: tempArray })
    }
  }

  moveEntryDown(id: number) {
    if (this.state.entries.length >= 2) {
      if (this.state.entries.length >= 2) {
        let tempArray: InitiativeTrackerEntry[] = [...this.state.entries];
        let entryIndex: number = this.state.entries.findIndex((entry: InitiativeTrackerEntry) => {
          return entry.id === id;
        });
        if (entryIndex === -1) {
          return;
        } else if (entryIndex === this.state.entries.length - 1) {
          let entry = tempArray.pop()!;
          tempArray.unshift(entry);
        } else {
          let nextEntryIndex: number = entryIndex + 1;
          let entry = tempArray.splice(nextEntryIndex, 1);
          tempArray.splice(entryIndex, 0, entry[0]);
        }
        this.setState({ entries: tempArray })
      }
    }
  }

  removeEntry(id: number) {
    this.setState({ 
      entries: this.state.entries.filter((entry: InitiativeTrackerEntry) => {
        return entry.id !== id;
      }),
    });
  }

  toggleEditEntry(id: number) {
    let tempArray = [...this.state.entries];
    let entry = tempArray.find((entry: InitiativeTrackerEntry) => {
      return entry.id === id;
    })!;

    if (entry.editMode) {
      entry.name = this.state.editEntryName;
      entry.hp = this.state.editEntryHp;
      entry.initiative = this.state.editEntryInitiative;
      entry.editMode = !entry.editMode;
      this.setState({ entries: tempArray });
    } else {
      entry.editMode = !entry.editMode;
      this.setState({ 
        entries: tempArray,
        editEntryName: entry.name,
        editEntryHp: entry.hp,
        editEntryInitiative: entry.initiative,
      });
    }
  }

  handleTurn = () => {
    if (this.state.entries.length > 0) {
      let tempArray = [...this.state.entries];
      let entry = tempArray.shift()!;
      tempArray.push(entry);
      this.setState({
        entries: tempArray,
      });
    }
  }

  handleSort = () => {
    this.setState({
      entries: this.sortEntries(this.state.entries),
    });
  }

  handleClear = () => {
    this.setState({
      entries: [],
    });
  }
}

export default InitiativeTracker;
