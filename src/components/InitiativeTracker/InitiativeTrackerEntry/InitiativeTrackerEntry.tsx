import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { GiPistolGun } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import CustomInput from '../../CustomInput/CustomInput';
import CustomButton from '../../CustomButton/CustomButton';
import CustomMenu from '../../CustomMenu/CustomMenu';
import CustomMenuOption from '../../CustomMenu/CustomMenuOption/CustomMenuOption';
import CustomMenuItem from '../../CustomMenu/CustomMenuItem/CustomMenuItem';

import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

interface DragItem {
  index: number;
  id: number;
  type: string;
}

interface EntryProps {
  opacity: number;
  marked: boolean;
}

const Entry = styled.div<EntryProps>`
  display: flex;
  position: relative;
  height: ${props => props.theme.spacings.p48};
  opacity: ${props => props.opacity};

  &:after {
    display: ${props => props.marked ? 'block' : 'none'};
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
  }

  &:nth-child(odd) {
    background-color: ${props => props.theme.colors.greyLight3};
  }
`;

const ColumnLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.verySmall};
  color: ${props => props.theme.colors.greyDark3};
`;

const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacings.p4};
  flex-grow: 1;
`;

const HpColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacings.p4};
  flex-grow: 0;
  width: ${props => props.theme.spacings.p96};
`;

const InitiativeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacings.p4};
  flex-grow: 0;
  width: ${props => props.theme.spacings.p96};
`;

const ActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacings.p4};
  flex-grow: 0;
`;

const DesktopActionsContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-end;
  padding: 0;

  @media screen and (min-width: ${props => props.theme.spacings.p640}) {
    display: flex;
  }
`;

const MobileActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;

  @media screen and (min-width: ${props => props.theme.spacings.p640}) {
    display: none;
  }
`;

interface InitiativeTrackerEntryProps {
  id: number;
  index: number;
  name: string;
  hp: string;
  initiative: number;
  isGunReady: boolean;
  gunReadinessEnabled: boolean;
  marked: boolean;

  onToggleGunReady: (id: number) => void;
  onEditEntry: (id: number, name: string, hp: string, initiative: number) => void;
  onRemoveEntry: (id: number) => void;
  onMoveEntryUp: (id: number) => void;
  onMoveEntryDown: (id: number) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const InitiativeTrackerEntry: React.FC<InitiativeTrackerEntryProps> = (props) => {
  const isGunReadyInitiative = 50;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedEntryName, setEditedEntryName] = useState(props.name);
  const [editedEntryHp, setEditedEntryHp] = useState(props.hp);
  const [editedEntryInitiative, setEditedEntryInitiative] = useState(props.initiative);

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
      setIsEditMode(!isEditMode);
      props.onEditEntry(props.id, editedEntryName, editedEntryHp, editedEntryInitiative);
    } else {
      setIsEditMode(!isEditMode);
    }
  }

  const onToggleGunReady = () => {
    props.onToggleGunReady(props.id);
  }

  const removeEntry = (evt: React.MouseEvent<HTMLElement>) => {
    if (props.onRemoveEntry) {
      props.onRemoveEntry(props.id);
    }
  }

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(entryRef));

  return (
    <Entry
      ref={entryRef}
      key={props.id}
      data-id={props.id}
      id={`entry_${props.id}`}
      opacity={opacity}
      marked={props.marked}
    >
      <NameColumn>
        <ColumnLabel>Name</ColumnLabel>
        <div>
          {(() => {
            if (!isEditMode) {
              return props.name;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="text"
                  defaultValue={props.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryName(event.target.value)}
                />
              );
            }
          })()}
        </div>
      </NameColumn>
      <HpColumn>
        <ColumnLabel>HP</ColumnLabel>
        <div>
          {(() => {
            if (!isEditMode) {
              return props.hp;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="text"
                  defaultValue={props.hp}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryHp(event.target.value)}
                />
              );
            }
          })()}
        </div>
      </HpColumn>
      <InitiativeColumn>
        <ColumnLabel>Initiative</ColumnLabel>
        <div>
          {(() => {
            if (!isEditMode) {
              return props.isGunReady && props.gunReadinessEnabled ? `${props.initiative} (+${isGunReadyInitiative})` : props.initiative;
            } else {
              return (
                <CustomInput
                  fullWidth
                  type="number"
                  defaultValue={props.initiative}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedEntryInitiative(Number(event.target.value))}
                />
              );
            }
          })()}
        </div>
      </InitiativeColumn>
      <ActionsColumn>
        <DesktopActionsContainer>
          {(() => {
            if (props.gunReadinessEnabled) {
              return (
                <CustomButton
                  icon
                  secondary
                  clicked={props.isGunReady}
                  onClick={onToggleGunReady}
                  title="Gun ready"
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
            title="Edit mode"
          >
            <FaPen size="1.25em" />
          </CustomButton>
          <CustomButton
            icon
            secondary
            onClick={removeEntry}
            title="Remove entry"
          >
            <FaTimes size="1.25em" />
          </CustomButton>
        </DesktopActionsContainer>
        <MobileActionsContainer>
          <CustomMenu
            activatorIcon
            activatorSecondary
            activatorContent={<FaChevronDown size="1.25em" />}
          >
            {(() => {
              if (props.gunReadinessEnabled) {
                return (
                  <CustomMenuOption
                    onClick={onToggleGunReady}
                    clicked={props.isGunReady}
                  >
                    Gun
                  </CustomMenuOption>
                );
              }
            })()}
            <CustomMenuOption
              onClick={onToggleEditEntry}
              clicked={isEditMode}
            >
              Edit
            </CustomMenuOption>
            <CustomMenuItem
              onClick={removeEntry}
            >
              Delete
            </CustomMenuItem>
          </CustomMenu>
        </MobileActionsContainer>
      </ActionsColumn>
    </Entry>
  );
}

export default InitiativeTrackerEntry;