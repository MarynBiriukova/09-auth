import React, { Suspense } from 'react';
import Loader from '../../../../components/Loader/Loader'; // Укажите правильный путь к вашему лоудеру

export default function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Обертывание в Suspense сообщает Next.js, что внутри происходит асинхронный prefetchQuery
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}