import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AppointmentSchedulingStepProps {
  appointment: {
    center: string;
    date: string;
    time: string;
  };
  onAppointmentUpdate: (appointment: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const centers = [
  {
    id: 'manama-center',
    name: 'Manama Service Center',
    address: 'Building 123, Road 456, Manama 123',
    hours: '8:00 AM - 4:00 PM',
    available: true
  },
  {
    id: 'riffa-center',
    name: 'Riffa Service Center', 
    address: 'Building 789, Road 012, Riffa 456',
    hours: '9:00 AM - 3:00 PM',
    available: true
  },
  {
    id: 'muharraq-center',
    name: 'Muharraq Service Center',
    address: 'Building 345, Road 678, Muharraq 789',
    hours: '8:30 AM - 3:30 PM',
    available: false
  }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'
];

export const AppointmentSchedulingStep: React.FC<AppointmentSchedulingStepProps> = ({
  appointment,
  onAppointmentUpdate,
  onNext,
  onPrevious,
}) => {
  const [selectedCenter, setSelectedCenter] = useState(appointment.center);
  const [selectedDate, setSelectedDate] = useState(appointment.date);
  const [selectedTime, setSelectedTime] = useState(appointment.time);

  // Generate available dates for the next 30 days (excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          available: Math.random() > 0.3 // Random availability for demo
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  
  const handleCenterSelect = (centerId: string) => {
    setSelectedCenter(centerId);
    // Reset date and time when center changes
    setSelectedDate('');
    setSelectedTime('');
    onAppointmentUpdate({
      center: centerId,
      date: '',
      time: ''
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Reset time when date changes
    setSelectedTime('');
    onAppointmentUpdate({
      center: selectedCenter,
      date: date,
      time: ''
    });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onAppointmentUpdate({
      center: selectedCenter,
      date: selectedDate,
      time: time
    });
  };

  const isComplete = selectedCenter && selectedDate && selectedTime;
  const selectedCenterData = centers.find(c => c.id === selectedCenter);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Schedule Appointment</h2>
        <p className="text-gray-600">
          Choose your preferred service center, date, and time for your appointment
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Service Center Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <MapPin className="w-5 h-5 text-blue-500" />
            Select Service Center
          </h3>
          
          <div className="grid gap-4">
            {centers.map((center) => (
              <div
                key={center.id}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${selectedCenter === center.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : center.available 
                      ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  }
                `}
                onClick={() => center.available && handleCenterSelect(center.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{center.name}</h4>
                      {!center.available && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Unavailable</span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {center.address}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {center.hours}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${selectedCenter === center.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {selectedCenter === center.id && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        {selectedCenter && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <Calendar className="w-5 h-5 text-blue-500" />
              Select Date
            </h3>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {availableDates.slice(0, 15).map((date) => (
                <Button
                  key={date.value}
                  variant={selectedDate === date.value ? "default" : "outline"}
                  size="sm"
                  disabled={!date.available}
                  onClick={() => handleDateSelect(date.value)}
                  className={`p-3 h-auto flex flex-col ${
                    selectedDate === date.value 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                      : !date.available ? 'opacity-50' : 'hover:border-blue-300'
                  }`}
                >
                  <span className="text-xs">{date.label.split(' ')[0]}</span>
                  <span className="font-semibold">{date.label.split(' ')[1]} {date.label.split(' ')[2]}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Time Selection */}
        {selectedCenter && selectedDate && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5 text-blue-500" />
              Select Time
            </h3>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const isAvailable = Math.random() > 0.3; // Random availability for demo
                return (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    disabled={!isAvailable}
                    onClick={() => handleTimeSelect(time)}
                    className={`${
                      selectedTime === time 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                        : !isAvailable ? 'opacity-50' : 'hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Appointment Summary */}
        {isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Appointment Confirmed</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <p><strong>Center:</strong> {selectedCenterData?.name}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Address:</strong> {selectedCenterData?.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">Important Notice</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Please arrive 15 minutes before your scheduled time</li>
            <li>• Bring all original documents listed in your checklist</li>
            <li>• Appointments can be rescheduled up to 24 hours in advance</li>
            <li>• No-shows will require rebooking with additional fees</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="lg"
            className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!isComplete}
            size="lg"
            className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};