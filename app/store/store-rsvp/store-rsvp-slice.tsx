
import { RsvpData } from '@/app/elements/speech-carousel/speech-carousel.ui'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const initialRsvpMessageState: RsvpData[] = []

const rsvpMessageSlice = createSlice({
    name: 'rsvpMessages',
    initialState: initialRsvpMessageState,
    reducers: {
        updateMessage(_, action: PayloadAction<RsvpData[]>) {
        return action.payload 
        }
    }
})

export const { updateMessage } = rsvpMessageSlice.actions
export default rsvpMessageSlice.reducer