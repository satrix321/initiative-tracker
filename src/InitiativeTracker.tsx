import React from 'react';
import './InitiativeTracker.scss';

class InitiativeTrackerEntry {
  id: number;
  name: string;
  initiative: number;

  constructor(id: number, name: string, initiative: number) {
    this.id = id;
    this.name = name;
    this.initiative = initiative;
  }
}

class InitiativeTracker extends React.Component {
  idCounter: number;
  state: {
    entryName: string,
    entryInitiative: number,
    entries: InitiativeTrackerEntry[],
  };

  constructor(props: any) {
    super(props);
    this.idCounter = 0;
    this.state = {
      entryName: '',
      entryInitiative: 0,
      entries: [],
    };

    this.setEntryName = this.setEntryName.bind(this);
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
                <th align="left">Initiative</th>
                <th>Actions</th>
              </tr>
            </thead>
            {this.renderEntries()}
          </table>
        </div>
        <div className="InitiativeTracker-footer">
          <input className="InitiativeTracker-input" type="text" placeholder="Name" value={this.state.entryName} onChange={this.setEntryName}></input>
          <input className="InitiativeTracker-input" type="number" placeholder="Initiative" value={this.state.entryInitiative || ''} onChange={this.setEntryInitiative}></input>
          <button className="InitiativeTracker-button" onClick={this.addEntry}>Add</button>
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
              <td>{entry.initiative}</td>
              <td><button className="InitiativeTracker-button" onClick={this.removeEntry.bind(this, entry.id)}>Remove</button></td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  setEntryName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryName: event.target.value });
  }

  setEntryInitiative(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryInitiative: Number(event.target.value) });
  }

  addEntry = () => {
    if (this.state.entryName && this.state.entryInitiative) {
      let tempArray = [...this.state.entries, new InitiativeTrackerEntry(this.idCounter, this.state.entryName, this.state.entryInitiative)];
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
        entryInitiative: 0,
      });
      this.idCounter++;
    }
  }

  sortEntries = (entries: InitiativeTrackerEntry[]) => {
    if (entries.length > 0) {
      return [...entries].sort((firstEntry: InitiativeTrackerEntry, secondEntry: InitiativeTrackerEntry) => {
        return secondEntry.initiative - firstEntry.initiative;
      });
    } else {
      return entries;
    }
  }

  removeEntry = (id: number) => {
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
