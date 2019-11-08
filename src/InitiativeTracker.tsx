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
          Initiative Tracker
          <button className="InitiativeTracker-button" onClick={this.handleTurn}>Turn</button>
          <button className="InitiativeTracker-button" onClick={this.handleSort}>Sort</button>
          <button className="InitiativeTracker-button" onClick={this.handleClear}>Clear</button>
        </div>
        <div className="InitiativeTracker-body">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Initiative</th>
                <th>Actions</th>
              </tr>
            </thead>
            {this.renderEntries()}
          </table>
        </div>
        <div className="InitiativeTracker-footer">
          <input type="text" placeholder="Name" value={this.state.entryName} onChange={this.setEntryName}></input>
          <input type="number" placeholder="Initiative" value={this.state.entryInitiative || ''} onChange={this.setEntryInitiative}></input>
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
      let tempArray = [...this.state.entries];
      let smallestInitiative = 0;
      let biggestInitiative = 0;
      let indexToInsert = tempArray.findIndex((element, index, array) => {
        smallestInitiative = index === 0 ? element.initiative : (element.initiative < smallestInitiative ? element.initiative : smallestInitiative);
        biggestInitiative = element.initiative > biggestInitiative ? element.initiative : biggestInitiative;
        if (this.state.entryInitiative === element.initiative) {
          return true;
        } else if (this.state.entryInitiative > element.initiative) {
          if (index === 0) {
            return this.state.entryInitiative < array[array.length - 1].initiative;
          } else {
            return this.state.entryInitiative < array[index - 1].initiative;
          }
        } else {
          return false;
        }
      });

      if (indexToInsert === -1) {
        if (this.state.entryInitiative > biggestInitiative) {
          indexToInsert = tempArray.findIndex((element) => {
            return element.initiative === biggestInitiative;
          });
        } else if (this.state.entryInitiative < smallestInitiative) {
          indexToInsert = tempArray.findIndex((element) => {
            return element.initiative === smallestInitiative;
          }) + 1;
        } else {
          indexToInsert = tempArray.length;
        }
      }

      tempArray.splice(indexToInsert, 0, new InitiativeTrackerEntry(this.idCounter, this.state.entryName, this.state.entryInitiative));

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
      let entry = tempArray.shift();
      this.setState({
        entries: [...tempArray, entry],
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
