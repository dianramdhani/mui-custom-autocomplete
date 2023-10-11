import React, { useEffect, useState } from 'react'
import NoGroup from './NoGroup'
import WithGroup from './WithGroup'
import type { MemberSimplified } from './dummyData'

const App = () => {
  const [participants, setParticipants] = useState<MemberSimplified[]>([])

  useEffect(() => {
    participants.length && console.log('participants', participants)
  }, [participants])

  return (
    <>
      <NoGroup />
      <br />
      <WithGroup
        value={participants}
        onChange={(newValue) => setParticipants(newValue)}
      />
    </>
  )
}

export default App
