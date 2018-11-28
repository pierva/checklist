const day = $(".day");
const hrs = $(".hours");
const min = $(".minutes");
const sec = $(".seconds");
const last = moment();

day.text(last.format('ddd'));
hrs.text(last.format('HH'));
min.text(last.format('mm'));
sec.text(last.format('ss'));

function updateTime() {
  const now = moment();
  last.day() !== now.day() ? day.text(now.format('ddd')) : '';
  last.hour() !== now.hour() ? hrs.text(now.format('HH')) : '';
  last.minute() !== now.minute() ? min.text(now.format('mm')) : '';
  last.second() !== now.second() ? sec.text(now.format('ss')) : '';
}

setInterval(updateTime, 1000);
