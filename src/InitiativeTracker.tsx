import React from 'react';
import './InitiativeTracker.css';

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
          <h1>Initiative Tracker</h1>
        </div>
        <div className="InitiativeTracker-body">
          <ul>
          {this.state.entries.map((entry: InitiativeTrackerEntry) => (
            <li key={entry.id} data-id="{entry.id}">
              {entry.name}
              <button className="InitiativeTracker-button" onClick={this.removeEntry.bind(this, entry.id)}>Remove</button>
            </li>
          ))}
        </ul>
        </div>
        <div className="InitiativeTracker-footer">
          <input type="text" placeholder="Name" value={this.state.entryName} onChange={this.setEntryName}></input>
          <input type="number" placeholder="Initiative" value={this.state.entryInitiative} onChange={this.setEntryInitiative}></input>
          <button className="InitiativeTracker-button" onClick={this.addEntry}>Add</button>
        </div>
      </div>
    )
  }

  setEntryName(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryName: event.target.value });
  }

  setEntryInitiative(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ entryInitiative: event.target.value });
  }

  addEntry = () => {
    this.setState({
      entries: [...this.state.entries, new InitiativeTrackerEntry(this.idCounter, this.state.entryName, this.state.entryInitiative)]
    });
    this.idCounter++;
  }

  removeEntry(id: number) {
    this.setState({ 
      entries: this.state.entries.filter((entry: InitiativeTrackerEntry) => {
        return entry.id !== id;
      })
    });
  }
}

export default InitiativeTracker;
