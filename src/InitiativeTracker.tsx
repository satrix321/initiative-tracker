import React from 'react';
import './InitiativeTracker.scss';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
// import { IoMdCreate } from "react-icons/io";
import { GiPistolGun } from "react-icons/gi";

class InitiativeTrackerEntry {
  id: number;
  name: string;
  hp: number;
  initiative: number;
  isGunReady: boolean;

  constructor(id: number, name: string, hp: number, initiative: number) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.initiative = initiative;
    this.isGunReady = false;
  }
}

class InitiativeTracker extends React.Component {
  idCounter: number;
  state: {
    entryName: string,
    entryHp: number,
    entryInitiative: number,
    entries: InitiativeTrackerEntry[],
  };

  constructor(props: any) {
    super(props);
    this.idCounter = 0;
    this.state = {
      entryName: '',
      entryHp: 0,
      entryInitiative: 0,
      entries: [],
    };

    this.setEntryName = this.setEntryName.bind(this);
    this.setEntryHp = this.setEntryHp.bind(this);
    this.setEntryInitiative = this.setEntryInitiative.bind(this);
  }

  render() {
    return (
      <div className="InitiativeTracker">
        <div className="InitiativeTracker-header">
          <span className="InitiativeTracker-title">Initiative Tracker</span>
          <button className="InitiativeTracker-button" onClick={this.handleTurn}>Turn</button>
          <button className="InitiativeTracker-button" onClick={this.handleSort}>Sort</button>
          <button className="InitiativeTracker-button" onClick={this.handleClear}>Clear</button>
        </div>
        <div className="InitiativeTracker-body">
          <table className="InitiativeTracker-table">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">HP</th>
                <th align="left">Initiative</th>
                <th className="InitiativeTracker-table-contentWidthColumn">Actions</th>
              </tr>
            </thead>
            {this.renderEntries()}
          </table>
        </div>
        <div className="InitiativeTracker-footer">
          <input className="InitiativeTracker-input" type="text" placeholder="Name" value={this.state.entryName} onChange={this.setEntryName}></input>
          <input className="InitiativeTracker-input" type="number" placeholder="Hp" value={this.state.entryHp || ''} onChange={this.setEntryHp}></input>
          <input className="InitiativeTracker-input" type="number" placeholder="Initiative" value={this.state.entryInitiative || ''} onChange={this.setEntryInitiative}></input>
          <button className="InitiativeTracker-iconButton" onClick={this.addEntry}><IoIosAdd size="2em" /></button>
        </div>
      </div>
    )
  }

  renderEntries() {
    return (
      <tbody>
        {this.state.entries
          .map((entry: InitiativeTrackerEntry) => (
            <tr key={entry.id} data-id="{entry.id}">
              <td>{entry.name}</td>
              <td>{entry.hp}</td>
              <td>{entry.isGunReady ? `${entry.initiative} (+50)` : entry.initiative}</td>
              <td className="InitiativeTracker-entryActions">
                <button className={`InitiativeTracker-iconButton ${entry.isGunReady ? "InitiativeTracker-iconButton-clicked" : ""}`} onClick={this.toggleGun.bind(this, entry.id)}><GiPistolGun size="1.5em" /></button>
                <span className="InitiativeTracker-entryActions-arrows">
                  <button className="InitiativeTracker-iconButton" onClick={this.moveEntryUp.bind(this, entry.id)}><IoIosArrowUp /></button>
                  <button className="InitiativeTracker-iconButton" onClick={this.moveEntryDown.bind(this, entry.id)}><IoIosArrowDown /></button>
                </span>
                <button className="InitiativeTracker-iconButton" onClick={this.removeEntry.bind(this, entry.id)}><IoIosClose size="2em" /></button>
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  setEntryName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryName: event.target.value });
  }

  setEntryHp(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryHp: event.target.value });
  }

  setEntryInitiative(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryInitiative: Number(event.target.value) });
  }

  addEntry = () => {
    if (this.state.entryName && this.state.entryInitiative) {
      let tempArray = [...this.state.entries, new InitiativeTrackerEntry(this.idCounter, this.state.entryName, this.state.entryHp, this.state.entryInitiative)];
      if (this.state.entries.length > 0) {
        let firstElement = this.state.entries[0];
        tempArray = this.sortEntries(tempArray);
        while (tempArray[0].id !== firstElement.id) {
          let entry = tempArray.shift()!;
          tempArray.push(entry);
        }
      }

      this.setState({
        entries: tempArray,
        entryName: '',
        entryHp: 0,
        entryInitiative: 0,
      });
      this.idCounter++;
    }
  }

  sortEntries = (entries: InitiativeTrackerEntry[]) => {
    if (entries.length > 0) {
      return [...entries].sort((firstEntry: InitiativeTrackerEntry, secondEntry: InitiativeTrackerEntry) => {
        return (secondEntry.initiative + (secondEntry.isGunReady ? 50 : 0)) - (firstEntry.initiative + (firstEntry.isGunReady ? 50 : 0));
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
