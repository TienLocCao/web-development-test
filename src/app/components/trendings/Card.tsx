"use client";

import { ShieldCheck } from "lucide-react";

interface TrendingItem {
  id: number;
  author: string;
  authorShort: string;
  verified?: boolean;
  title: string;
  content: string;
}

const items: TrendingItem[] = [
  {
    id: 1,
    author: "Beincom Global Admin",
    authorShort: "BIC",
    verified: true,
    title: "Biểu tượng lá cờ và cảm hứng sáng tạo bộ NFT VN80",
    content: "",
  },
  {
    id: 2,
    author: "Beincom Global Admin",
    authorShort: "BIC",
    verified: true,
    title: "🚀 Tất tần tật thông tin về Airdrop $BIC đợt 5/60 - Bạn không thể bỏ qua!…",
    content: "",
  },
  {
    id: 3,
    author: "Beincom Global Admin",
    authorShort: "BIC",
    verified: true,
    title: "Ra mắt Bộ sưu tập NFT “Dưới Bóng Cờ Tổ Quốc”: Hào khí 80 năm",
    content: "",
  },
  {
    id: 4,
    author: "Beincom Global Admin",
    authorShort: "BIC",
    verified: true,
    title: "🎉 Kết quả QUIZ 06 đã có – Kiểm tra ngay!…",
    content: "",
  },
  {
    id: 5,
    author: "Beincom Global Admin",
    authorShort: "BIC",
    verified: true,
    title: "NFT đặc biệt và hoạt động hướng ứng sự kiện A80…",
    content: "",
  },
];

export default function TrendingCard() {
  return (
    <aside className="bg-white rounded-xl p-4 shadow-sm w-80 h-[max-content]">
      <h2 className="text-base font-semibold text-gray-700 mb-3">Trending</h2>

      <div className="flex flex-col divide-y divide-gray-200">
        {items.map((item) => (
          <article key={item.id} className="py-3 flex gap-2">
            <span className="text-sm font-bold text-gray-500 w-4">
              {item.id}
            </span>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-sm text-blue-600 font-medium">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold">
                  {item.authorShort}
                </span>
                {item.author}
                {item.verified && (
                  <ShieldCheck size={14} className="text-blue-500" />
                )}
              </div>

              <p className="text-sm text-gray-800">{item.title}</p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
