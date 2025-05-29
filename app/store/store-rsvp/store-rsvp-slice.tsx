
import { GETRsvpData } from '@/app/elements/rsvp-form/rsvp-form.server'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const initialRsvpMessageState: GETRsvpData[] = []

const rsvpMessageSlice = createSlice({
    name: 'rsvpMessages',
    initialState: initialRsvpMessageState,
    reducers: {
        updateMessage(_, action: PayloadAction<GETRsvpData[]>) {
        return action.payload 
        }
    }
})

export const { updateMessage } = rsvpMessageSlice.actions
export default rsvpMessageSlice.reducer