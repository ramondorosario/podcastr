export const convertDurationToTimeString = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let result: string[];

  if (hours) {
    result = [hours, minutes, seconds].map((unit, i) => {
      return i === 0 ? unit.toString() : unit.toString().padStart(2, "0");
    });
  } else {
    result = [minutes, seconds].map((unit) => {
      return unit.toString().padStart(2, "0");
    });
  }

  return result.join(":");
};
