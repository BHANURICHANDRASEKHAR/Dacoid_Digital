import React, { useState, useContext } from "react";
import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import { UserContext } from "../Context/Main";

const App = () => {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const { data, setdata, setmodal,SetSeletedDate } = useContext(UserContext);

  const onSelect = (newValue) => {
    if (newValue.isSame(value, "month")) {
      setdata({ ...data, selectedDate: newValue?.format("YYYY-MM-DD") });
      SetSeletedDate(newValue?.format("YYYY-MM-DD"))
      setmodal(true);
    }
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Alert
        message={`You selected date: ${selectedValue?.format("YYYY-MM-DD")}`}
        type="info"
      />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} miniContentHeight={265} />
    </div>
  );
};

export default App;
