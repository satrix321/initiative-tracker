import React, { useRef, useState } from 'react';
import './InitiativeTrackerEntry.scss';

import { GiPistolGun } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';

import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

interface DragItem {
  index: number;
  id: number;
  type: string;
}

interface InitiativeTrackerEntryProps {
  id: number;
  index: number;
  name: string;
  hp: string;
  initiative: number;
  isGunReady: boolean;
  gunReadinessEnabled: boolean;

  onToggleGunReady: (id: number) => void;
  onEditEntry: (id: number, name: string, hp: string, initiative: number, isGunReady: boolean) => void;
  onRemoveEntry: (id: number) => void;
  onMoveEntryUp: (id: number) => void;
  onMoveEntryDown: (id: number) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const InitiativeTrackerEntry: React.FC<InitiativeTrackerEntryProps> = (props) => {
  const isGunReadyInitiative = 50;

  const [name, setName] = useState(props.name);
  const [hp, setHp] = useState(props.hp);
  const [initiative, setinitiative] = useState(props.initiative);
  const [isGunReady, setIsGunReady] = useState(props.isGunReady);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedEntryName, setEditedEntryName] = useState('');
  const [editedEntryHp, setEditedEntryHp] = useState('');
  const [editedEntryInitiative, setEditedEntryInitiative] = useState(0);

  const entryRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'InitiativeTrackerEntry',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!entryRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = entryRef.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'InitiativeTrackerEntry', index: props.index, id: props.id },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const onToggleEditEntry = () => {
    if (isEditMode) {
      setName(editedEntryName);
      setHp(editedEntryHp);
      setinitiative(editedEntryInitiative);
      setIsEditMode(!isEditMode);
      props.onEditEntry(props.id, editedEntryName, editedEntryHp, editedEntryInitiative, props.isGunReady);
    } else {
      setIsEditMode(!isEditMode);
      setEditedEntryName(name);
      setEditedEntryHp(hp);
      setEditedEntryInitiative(initiative);
    }
  }

  const onToggleGunReady = () => {
    props.onToggleGunReady(props.id);
    setIsGunReady(!isGunReady);
  }

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(entryRef));

  return (
    <div
      ref={entryRef}
      className="initiative-tracker__entry"
      key={props.id}
      data-id={props.id}
      id={`entry_${props.id}`}
      style={{opacity}}
    >
      <div className="initiative-tracker__name-column">
        <div className="initiative-tracker__column-label">Name</div>
        <div>
          {(() => {
            if (!isEditMode) {
              return name;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="text"
                  defaultValue={name}
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
            if (!isEditMode) {
              return hp;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="text"
                  defaultValue={hp}
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
            if (!isEditMode) {
              return isGunReady && props.gunReadinessEnabled ? `${initiative} (+${isGunReadyInitiative})` : initiative;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="number"
                  defaultValue={initiative}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryInitiative(Number(event.target.value))}
                />
              );
            }
          })()}
        </div>
      </div>
      <div className="initiative-tracker__actions-column">
        <div className="initiative-tracker__actions-container initiative-tracker__actions-container--desktop-only">
          {(() => {
            if (props.gunReadinessEnabled) {
              return (
                <CustomButton
                  icon
                  secondary
                  clicked={isGunReady}
                  onClick={onToggleGunReady}
                  ariaLabel="Gun ready"
                >
                  <GiPistolGun size="1.75em" />
                </CustomButton>
              );
            } else {
              return <></>
            }
          })()}
          <CustomButton
            icon
            secondary
            clicked={isEditMode}
            onClick={onToggleEditEntry}
            ariaLabel="Edit mode"
          >
            <FaPen size="1.25em" />
          </CustomButton>
          <CustomButton
            icon
            secondary
            onClick={props.onRemoveEntry.bind(undefined, props.id)}
            ariaLabel="Remove entry"
          >
            <FaTimes size="1.25em" />
          </CustomButton>
        </div>
        <div className="initiative-tracker__actions-container initiative-tracker__actions-container--mobile-only">
          <CustomMenu
            activatorIcon
            activatorSecondary
            activatorContent={<FaChevronDown size="1.25em" />}
          >
            {(() => {
              if (props.gunReadinessEnabled) {
                return (
                  <CustomMenuItem
                    onClick={onToggleGunReady}
                    clicked={isGunReady}
                  >
                    Gun
                  </CustomMenuItem>
                );
              }
            })()}
            <CustomMenuItem
              onClick={onToggleEditEntry}
              clicked={isEditMode}
            >
              Edit
            </CustomMenuItem>
            <CustomMenuItem
              onClick={props.onRemoveEntry.bind(undefined, props.id)}
            >
              Delete
            </CustomMenuItem>
          </CustomMenu>
        </div>
      </div>
    </div>
  );
}

export default InitiativeTrackerEntry;