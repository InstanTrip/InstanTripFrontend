import { useState } from 'react';
import { ko } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const today = new Date();
today.setHours(0, 0, 0, 0); // 시간 초기화

const Calender = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <div>
      <DayPicker
        locale={ko}
        mode="range"
        defaultMonth={today} // 현재 날짜가 속한 월을 디폴트로 설정
        selected={range}
        onSelect={setRange}
        disabled={{ before: today }} 
      />
    </div>
  );
};

export default Calender;
