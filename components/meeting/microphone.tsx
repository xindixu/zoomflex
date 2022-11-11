/* eslint-disable no-nested-ternary */
import React from "react"
import { Menu, Tooltip, Dropdown, Button } from "antd"
import classNames from "classnames"
import {
  AudioOutlined,
  AudioMutedOutlined,
  CheckOutlined,
  UpOutlined,
  PhoneOutlined,
} from "@ant-design/icons"
import { MediaDevice } from "./video-types"

import "./microphone.module.scss"

const { Button: DropdownButton } = Dropdown

interface MicrophoneButtonProps {
  isStartedAudio: boolean
  isMuted: boolean
  isSupportPhone?: boolean
  disabled?: boolean
  audio?: string
  onMicrophoneClick: () => void
  onMicrophoneMenuClick: (key: string) => void

  className?: string
  microphoneList?: MediaDevice[]
  speakerList?: MediaDevice[]
  activeMicrophone?: string
  activeSpeaker?: string
  phoneCallStatus?: { text: string; type: string }
}
const MicrophoneButton = (props: MicrophoneButtonProps) => {
  const {
    isStartedAudio,
    isMuted,
    audio,
    className,
    microphoneList,
    speakerList,
    activeMicrophone,
    activeSpeaker,
    disabled,
    onMicrophoneClick,
    onMicrophoneMenuClick,
  } = props

  const tooltipText = isStartedAudio
    ? isMuted
      ? "unmute"
      : "mute"
    : "start audio"
  const menu = []
  if (microphoneList?.length && audio !== "phone") {
    menu.push({
      group: "microphone",
      title: "Select a Microphone",
      items: microphoneList.map((i) => ({
        label: i.label,
        value: i.deviceId,
        checked: activeMicrophone === i.deviceId,
      })),
    })
  }
  if (speakerList?.length && audio !== "phone") {
    menu.push({
      group: "speaker",
      title: "Select a speaker",
      items: speakerList.map((i) => ({
        label: i.label,
        value: i.deviceId,
        checked: activeSpeaker === i.deviceId,
      })),
    })
  }
  if (audio !== "phone") {
    menu.push({
      items: [
        {
          label: "Audio Statistic",
          value: "statistic",
        },
      ],
    })
  }

  menu.push({
    items: [
      {
        label: audio === "phone" ? "Hang Up" : "Leave Audio",
        value: "leave audio",
      },
    ],
  })

  const onMenuItemClick = (payload: { key: any }) => {
    onMicrophoneMenuClick(payload.key)
  }

  const overlayMenu = (
    <Menu onClick={onMenuItemClick} theme="dark" className="microphone-menu">
      {menu.map((e) => {
        if (e.group) {
          const mItem = e.items.map((m) => (
            <Menu.Item
              key={`${e.group}|${m.value}`}
              icon={m.checked && <CheckOutlined />}
            >
              {m.label}
            </Menu.Item>
          ))
          return (
            <React.Fragment key={e.group}>
              <Menu.ItemGroup title={e.title} key={e.group}>
                {mItem}
              </Menu.ItemGroup>
              <Menu.Divider key={`${e.group}-divider`} />
            </React.Fragment>
          )
        }
        return (e.items as Array<{ value: string; label: string }>).map(
          (m: any) => <Menu.Item key={m?.value}>{m?.label}</Menu.Item>
        )
      })}
    </Menu>
  )
  return (
    <div className={classNames("microphone-footer", className)}>
      {isStartedAudio ? (
        <DropdownButton
          className="microphone-dropdown-button"
          size="large"
          overlay={overlayMenu}
          onClick={onMicrophoneClick}
          trigger={["click"]}
          type="ghost"
          icon={<UpOutlined />}
          placement="topRight"
          disabled={disabled}
        >
          {isMuted ? <AudioMutedOutlined /> : <AudioOutlined />}
        </DropdownButton>
      ) : (
        <Tooltip title={tooltipText}>
          <Button
            className="microphone-button"
            icon={<PhoneOutlined />}
            size="large"
            ghost
            shape="circle"
            onClick={onMicrophoneClick}
          />
        </Tooltip>
      )}
    </div>
  )
}

export default MicrophoneButton
