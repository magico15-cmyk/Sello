"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';

import { TopBar } from './TopBar';

export function GlobalHeader({ store }: { store?: any }) {
  const pathname = usePathname();

  // Do not render the storefront header on admin pages
  if (pathname?.includes('/admin')) {
    return null;
  }

  // Notice Bar Desktop Settings
  const desktopNoticeEnabled = store?.notice_bar_desktop_enabled ?? false;
  const desktopNoticeText = store?.notice_bar_desktop_text || '';
  const desktopNoticeBgColor = store?.notice_bar_desktop_bg_color || '#000000';
  const desktopNoticeTextColor = store?.notice_bar_desktop_text_color || '#FFFFFF';
  const desktopNoticeAboveHeader = store?.notice_bar_desktop_above_header ?? true;

  // Notice Bar Mobile Settings
  const mobileNoticeEnabled = store?.notice_bar_mobile_enabled ?? false;
  const mobileNoticeText = store?.notice_bar_mobile_text || '';
  const mobileNoticeBgColor = store?.notice_bar_mobile_bg_color || '#000000';
  const mobileNoticeTextColor = store?.notice_bar_mobile_text_color || '#FFFFFF';
  const mobileNoticeAboveHeader = store?.notice_bar_mobile_above_header ?? true;

  const DesktopNoticeBar = () => {
    if (!desktopNoticeEnabled || !desktopNoticeText) return null;
    return (
      <div 
        className="hidden md:block w-full py-2.5 px-4 text-center text-[13px] font-medium"
        style={{ backgroundColor: desktopNoticeBgColor, color: desktopNoticeTextColor }}
        dangerouslySetInnerHTML={{ __html: desktopNoticeText }}
      />
    );
  };

  const MobileNoticeBar = () => {
    if (!mobileNoticeEnabled || !mobileNoticeText) return null;
    return (
      <div 
        className="md:hidden w-full py-2.5 px-4 text-center text-[13px] font-medium"
        style={{ backgroundColor: mobileNoticeBgColor, color: mobileNoticeTextColor }}
        dangerouslySetInnerHTML={{ __html: mobileNoticeText }}
      />
    );
  };

  return (
    <>
      {/* ABOVE HEADER NOTICES */}
      {desktopNoticeAboveHeader && <DesktopNoticeBar />}
      {mobileNoticeAboveHeader && <MobileNoticeBar />}

      <TopBar />
      <Header store={store} />

      {/* BELOW HEADER NOTICES */}
      {!desktopNoticeAboveHeader && <DesktopNoticeBar />}
      {!mobileNoticeAboveHeader && <MobileNoticeBar />}
    </>
  );
}
