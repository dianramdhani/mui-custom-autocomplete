import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { type MemberSimplified, groups, members } from './dummyData'
import { Chip } from '@mui/material'

interface Option {
  type: 'Member' | 'Group'
  label: string
  value: MemberSimplified | MemberSimplified[]
}

const randomId = () => Math.round(Math.random() * 100000)
const options = [
  ...members.map<Option>((member) => ({
    type: 'Member',
    label: member.name,
    value: member,
  })),
  ...groups.map<Option>((group) => ({
    type: 'Group',
    label: group.name,
    value: group.members,
  })),
]

interface WithGroupProps {
  value: MemberSimplified[]
  onChange: (newValue: MemberSimplified[]) => void
}

const WithGroup = ({ value, onChange }: WithGroupProps) => {
  const [localValue, setLocalValue] = React.useState<Option[]>([])

  React.useEffect(() => {
    localValue.length && console.log('auto complete with group', localValue)
  }, [localValue])

  React.useEffect(() => {
    if (value.length) {
      const currentValue = localValue.map(({ value }) => value).flat()
      if (JSON.stringify(value) !== JSON.stringify(currentValue)) {
        setLocalValue(
          value.map<Option>((value) => ({
            type: 'Member',
            label: value.name,
            value,
          }))
        )
      }
    }
  })

  return (
    <Autocomplete
      value={localValue}
      onChange={(_, newValue) => {
        const selectedOptions = newValue as Option[]
        setLocalValue(selectedOptions)
        onChange(selectedOptions.map(({ value }) => value).flat())
      }}
      multiple
      freeSolo
      autoHighlight
      clearOnBlur
      filterSelectedOptions
      options={options}
      groupBy={(options) => options.type}
      filterOptions={(options, state) => {
        const filteredOptions = createFilterOptions<Option>()(options, state)
        const inputValue = state.inputValue.trim()
        const isExisting = options.some(
          (option) => option.type === 'Member' && inputValue === option.label
        )

        if (!inputValue || isExisting) return filteredOptions
        return filteredOptions.concat({
          type: 'Member',
          label: inputValue,
          value: {
            idMember: randomId(),
            name: inputValue,
            isMember: false,
            idUser: randomId(),
          },
        })
      }}
      getOptionLabel={(option) => {
        option = option as Option
        if (option.type === 'Group') return `${option.label} (Group)`

        const value = option.value as MemberSimplified
        const { isMember, name } = value
        return !isMember ? `${name} (Guest)` : name
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder='Favorites' label='With Group' />
      )}
      renderTags={(value, getTagProps) =>
        value.map(({ label, type }, index) => (
          <Chip
            variant='outlined'
            color={type === 'Group' ? 'primary' : undefined}
            label={label}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  )
}

export default WithGroup
