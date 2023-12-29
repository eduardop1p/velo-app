/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import {
  useState,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { FaBell } from 'react-icons/fa';
import { FaGear, FaArrowLeft } from 'react-icons/fa6';
import IOSSwitch from '@/components/IOSSwitch';

export default function Notifications() {
  const [showAllNot, setShowAllNot] = useState(false);
  const [showUnreadNot, setShowUnreadNot] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationsSettings, setShowNotificationsSettings] =
    useState(false);
  const [isGeneralTransactionsNot, setIsGeneralTransactionsNot] = useState(
    localStorage.getItem('general-transactions-not') == 'true'
  );
  const [isPriceAlertNot, setIsPriceAlertNot] = useState(
    localStorage.getItem('price-alert-not') == 'true'
  );

  const handleNotificationsChecked = (
    event: MouseEvent<HTMLElement>,
    key: string,
    setStateAction: Dispatch<SetStateAction<boolean>>
  ) => {
    if (!event.currentTarget.classList.contains('Mui-checked')) {
      localStorage.setItem(key, 'true');
      setStateAction(true);
    } else {
      localStorage.removeItem(key);
      setStateAction(false);
    }
  };

  return (
    <div>
      <button
        className="w-5 h-w-5 flex items-center justify-center fill-primary"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell />
      </button>
      <div
        // eslint-disable-next-line
        className={`${showNotifications ? 'visible opacity-100' : 'invisible opacity-50'} bg-0006 w-full fixed inset-0 h-screen transition-all duration-200`}
        onClick={() => {
          setShowNotifications(false);
          setTimeout(() => {
            setShowNotifications(false);
          }, 500);
        }}
      >
        <div
          // eslint-disable-next-line
          className={`h-full-screen-80px absolute flex flex-col gap-8 p-8 top-[90px] w-[500px] rounded bg-1b1e20ff right-0 transition-transform duration-200 ${showNotifications ? 'translate-x-0' : 'translate-x-[500px]'}`}
          onClick={event => event.stopPropagation()}
        >
          <div className="flex justify-between w-full items-center min-h-[30px]">
            {!showNotificationsSettings ? (
              <h2 className="text-primary font-normal text-lg">
                Notifications
              </h2>
            ) : (
              <button
                className="w-5 h-5 flex justify-center items-center fill-primary flex-none"
                onClick={() => setShowNotificationsSettings(false)}
              >
                <FaArrowLeft />
              </button>
            )}
            <div className="flex gap-5 items-center">
              <div>
                {!showNotificationsSettings && (
                  <button
                    className="w-5 h-5 flex justify-center items-center fill-primary flex-none"
                    onClick={() => setShowNotificationsSettings(true)}
                  >
                    <FaGear />
                  </button>
                )}
              </div>
              <button
                className="w-5 h-5 flex justify-center items-center fill-primary flex-none"
                onClick={() => {
                  setShowNotifications(false);
                  setTimeout(() => {
                    setShowNotificationsSettings(false);
                  }, 500);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  width="100%"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>
          </div>

          {showNotificationsSettings ? (
            <div className="flex flex-col gap-4">
              <h3 className="text-primary text-base font-normal">
                Configure notifications
              </h3>
              <div className="flex w-full gap-3 justify-between">
                <div className="flex flex-col w-4/5">
                  <h4 className="text-primary text-[15px] font-normal">
                    General transactions
                  </h4>
                  <p className="text-sm font-normal text-primary opacity-50">
                    Receive notifications of transfers, purchases, sales,
                    withdrawals and deposits.
                  </p>
                </div>
                <IOSSwitch
                  onClick={(event: MouseEvent<HTMLElement>) =>
                    handleNotificationsChecked(
                      event,
                      'general-transactions-not',
                      setIsGeneralTransactionsNot
                    )
                  }
                  checked={isGeneralTransactionsNot}
                />
              </div>
              <div className="flex w-full gap-3 justify-between">
                <div className="flex flex-col w-4/5">
                  <h4 className="text-primary text-[15px] font-normal">
                    Price Alert
                  </h4>
                  <p className="text-sm font-normal text-primary opacity-50">
                    Receive notifications when the currency reaches the value
                    that was configured.
                  </p>
                </div>
                <IOSSwitch
                  onClick={(event: MouseEvent<HTMLElement>) =>
                    handleNotificationsChecked(
                      event,
                      'price-alert-not',
                      setIsPriceAlertNot
                    )
                  }
                  checked={isPriceAlertNot}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <button
                    // eslint-disable-next-line
                    className={`text-sm font-normal py-3 px-2 rounded cursor-pointer transition-colors duration-200 ${showAllNot ? 'bg-blue' : 'bg-272a2eff hover:bg-383b3eff'} text-primary rounded"`}
                    onClick={() => {
                      setShowAllNot(!showAllNot);
                      setShowUnreadNot(false);
                    }}
                  >
                    All
                  </button>
                  <button
                    // eslint-disable-next-line
                    className={`text-sm font-normal py-3 px-2 rounded cursor-pointer transition-colors duration-200 ${showUnreadNot ? 'bg-blue' : 'bg-272a2eff hover:bg-383b3eff'} text-primary rounded"`}
                    onClick={() => {
                      setShowUnreadNot(!showUnreadNot);
                      setShowAllNot(false);
                    }}
                  >
                    Unread
                  </button>
                </div>
                <p className="text-xs text-primary font-normal underline">
                  Mark all as read
                </p>
              </div>
              <p className="text-sm text-primary font-normal">
                There are no pending notifications!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
