import { useDispatch, useSelector } from "react-redux"
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothinSelectedView } from "../views"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {
  const { isSaving, active } = useSelector( state => state.journal);
  const dispatch = useDispatch();


  const onClickNewNote = () => {
    dispatch( startNewNote () )
  }
  return (
    <JournalLayout>
      
      { 
        ( !!active )
          ? <NoteView/>
          : <NothinSelectedView/>
      }
      
      
      <IconButton
        className="animate__animated animate__fadeIn"
        onClick={ onClickNewNote }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
          display: isSaving ? 'none' : ''
        }}
      >
        <AddOutlined sx={{ fontSize: 30}}/>
      </IconButton>
    </JournalLayout>
  )
}
