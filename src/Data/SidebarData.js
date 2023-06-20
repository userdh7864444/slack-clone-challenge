import MessageIcon from '@mui/icons-material/Message';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleIcon from '@mui/icons-material/People';
import AppsIcon from '@mui/icons-material/Apps';


export const sidebarItemsData = [
    {
        icon: <MessageIcon />,
        text: "Thread"
    },
    {
        icon: <InboxIcon />,
        text: "All DMs"
    },
    {
        icon: <DraftsIcon />,
        text: "Mentions &  Reactions"
    },
    {
        icon: <BookmarkBorderIcon />,
        text: "Save Items"
    },
    {
        icon: <PeopleIcon />,
        text: "Peoples & Groups"
    },
    {
        icon: <AppsIcon />,
        text: "More"
    }
]