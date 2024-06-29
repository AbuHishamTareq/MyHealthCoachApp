export interface OnboardingData {
  id: number;
  animation: string;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animation/running.json'),
    text: 'Take care of your body',
    textColor: '#FFFFFF',
    backgroundColor: '#B7ABFD',
  },
  {
    id: 2,
    animation: require('../assets/animation/doctor02.json'),
    text: 'To get Rich, never risk your health',
    textColor: '#000000',
    backgroundColor: '#F0CF69',
  },
  {
    id: 3,
    animation: require('../assets/animation/care.json'),
    text: 'The greatest wealth is health',
    textColor: '#FFFFFF',
    backgroundColor: '#95B6FF',
  },
];

export default data;