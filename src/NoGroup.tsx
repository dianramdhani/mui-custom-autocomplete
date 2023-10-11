import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { type MemberSimplified, members } from './dummyData'

const NoGroup = () => {
  const [value, setValue] = React.useState<MemberSimplified[]>([])

  React.useEffect(() => {
    value.length && console.log('auto complete without group', value)
  }, [value])

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => setValue(newValue as MemberSimplified[])}
      multiple
      freeSolo
      autoHighlight
      clearOnBlur
      filterSelectedOptions
      options={members}
      filterOptions={(options, state) => {
        const filteredOptions = createFilterOptions<MemberSimplified>()(
          options,
          state
        )
        const inputValue = state.inputValue.trim()
        const isExisting = options.some((option) => inputValue === option.name)
        const randomId = () => Math.random() * 10000

        return !!inputValue && !isExisting
          ? [
              ...filteredOptions,
              {
                idMember: randomId(),
                name: inputValue,
                isMember: false,
                idUser: randomId(),
              },
            ]
          : filteredOptions
      }}
      getOptionLabel={(option) => {
        const { isMember, name } = option as MemberSimplified
        return !isMember ? `${name} (Guest)` : name
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder='Favorites' label='No Group' />
      )}
    />
  )
}

export default NoGroup
