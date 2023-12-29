import { useState } from "react"
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import InputIcon from "react-multi-date-picker/components/input_icon"
import Icon from "react-multi-date-picker/components/icon"
import "react-multi-date-picker/styles/colors/purple.css"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import "react-multi-date-picker/styles/colors/teal.css"
import "react-multi-date-picker/styles/layouts/mobile.css"

export default function MultiDateCalendar({datevalues,setDatevalues}) {
    const today = new Date()
    const tomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)

    // const [values, setValues] = useState([])

    return (
        <button   style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}> Please Select Date
        <DatePicker
            placeholder="click to open"
            buttons={false}
            disableYearPicker 
            disableMonthPicker
            hideYear 
            hideMonth 
            // hideWeekDays 
            highlightToday={false}
            calendarPosition="bottom"
            fixMainPosition='true'
            multiple
            plugins={[
                <DatePanel />,
                <Toolbar
                    position="bottom"
                    names={{
                        today:'Today',
                        deselect:'Reset',
                        close: "close",
                    }}
                />,
            ]}
            render={<Icon />}
            // className="purple"
            className="teal"
            value={datevalues}
            onChange={setDatevalues}
            headerFormat={null}
        />
        </button>
    )
}