import React, { FunctionComponent, useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// components
import { Input } from './components/Input/Input';
import { IconTabMap } from '../../../icons/components';
import { DatePicker } from './components/DatePicker/DatePicker';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// providers
import { localesContext } from '../../../../localization/localization.provider';

// styles
import { styles } from './AddEvent.styles';
import colors from '../../../../styles/colors';

export const AddEvent: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const [eventName, setEventName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [price, setPrice] = useState('');
  const [aboutEvent, setAboutEvent] = useState('');

  const onChangeBeginDate = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) setBeginDate(selectedDate);
  };

  const onChangeBeginTime = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) setBeginTime(selectedDate);
  };

  const onChangeFinishDate = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) setFinishDate(selectedDate);
  };
  const onChangeFinishTime = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) setFinishTime(selectedDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{i18n._('You can create an event')}:</Text>
        <Input
          placeholder={i18n._('Enter the name of the event')}
          label={i18n._('Name of the event')}
          value={eventName}
          onChange={setEventName}
        />
        <Input
          placeholder={i18n._('Enter the address')}
          label={i18n._('The place of the event')}
          value={placeName}
          onChange={setPlaceName}
          InputIcon={<IconTabMap width={41} hanging={32} fill={colors.californiaOrange} />}
        />
        <Text style={styles.subtitle}>{i18n._('Date of the event')}</Text>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <DatePicker
              value={beginDate}
              label={`${i18n._('The beginning')}:`}
              onChange={onChangeBeginDate}
              mode="date"
            />
          </View>
          <View style={styles.inner}>
            <DatePicker value={beginTime} onChange={onChangeBeginTime} mode="time" />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <DatePicker
              value={finishDate}
              label={`${i18n._('Conclusion')}:`}
              onChange={onChangeFinishDate}
              mode="date"
            />
          </View>
          <View style={styles.inner}>
            <DatePicker value={finishTime} onChange={onChangeFinishTime} mode="time" />
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inner}>
            <Input
              placeholder={i18n._('100 uah')}
              label={`${i18n._('Participation fee')}:`}
              value={price}
              onChange={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inner} />
        </View>
        <View style={styles.wrapper}>
          <Input
            placeholder={i18n._('Briefly describe what will happen')}
            label={i18n._('Name of the event')}
            value={aboutEvent}
            customStyles={styles.multipleInput}
            onChange={setAboutEvent}
          />
        </View>
        <Text style={styles.subtitle}>{i18n._('Add a photo')}:</Text>
        <ButtonCustom title={i18n._('Confirm')} onSubmit={() => null} />
      </ScrollView>
    </View>
  );
};
