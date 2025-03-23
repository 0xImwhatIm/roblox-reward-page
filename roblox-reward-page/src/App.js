import React, { useState } from 'react';

const RobuxRewardSystem = () => {
  const [points, setPoints] = useState(150); // 示例積分值
  const [expandedCategory, setExpandedCategory] = useState('splus');
  const [lastReset, setLastReset] = useState('2025-03');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // 任務等級分類與對應行為
  const categories = [
    {
      id: 'splus',
      level: 'S+',
      name: '超棒棒',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-800',
      pointValue: 15,
      tasks: [
        { id: 's1', name: '提出學習計畫', completed: true },
        { id: 's2', name: '完成學習計畫', completed: false },
        { id: 's3', name: '提出假日規劃計畫', completed: false },
        { id: 's4', name: '完成假日規劃計畫', completed: false }
      ]
    },
    {
      id: 'aplus',
      level: 'A+',
      name: '主動很棒',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      pointValue: 10,
      tasks: [
        { id: 'ap1', name: '定時整理書桌書櫃玩具', completed: false },
        { id: 'ap2', name: '定時運動', completed: false },
        { id: 'ap3', name: '主動參與家務', completed: false },
        { id: 'ap4', name: '閱讀書籍計畫', completed: false },
        { id: 'ap5', name: '作業完成後自主檢查', completed: false }
      ]
    },
    {
      id: 'a',
      level: 'A',
      name: '多一點很棒',
      color: 'from-cyan-500 to-teal-600',
      bgColor: 'bg-teal-100',
      borderColor: 'border-teal-500',
      textColor: 'text-teal-800',
      pointValue: 5,
      tasks: [
        { id: 'a1', name: '維護書桌清潔', completed: false },
        { id: 'a2', name: '物件使用後歸位', completed: false },
        { id: 'a3', name: '遵守護眼規則', completed: false },
        { id: 'a4', name: '一次叫就起床', completed: false },
        { id: 'a5', name: '完成額外學習', completed: false }
      ]
    },
    {
      id: 'b',
      level: 'B',
      name: '基本棒棒',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      pointValue: 2,
      tasks: [
        { id: 'b1', name: '按時作息', completed: true },
        { id: 'b2', name: '刷牙洗臉洗頭', completed: true },
        { id: 'b3', name: '整理餐袋餐具', completed: false },
        { id: 'b4', name: '整理書包', completed: false },
        { id: 'b5', name: '準時完成作業', completed: false }
      ]
    },
    {
      id: 'c',
      level: 'C',
      name: '要注意囉',
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      pointValue: -3,
      tasks: [
        { id: 'c1', name: '拖延作業', completed: false },
        { id: 'c2', name: '違反指令', completed: false }
      ]
    },
    {
      id: 'd',
      level: 'D',
      name: '違規懲罰',
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      pointValue: -8,
      tasks: [
        { id: 'd1', name: '說謊', completed: false },
        { id: 'd2', name: '與他人嚴重衝突', completed: false }
      ]
    }
  ];
  
  // 計算可兌換的 Robux，最高為 800
  const calculateRobux = () => {
    return Math.min(Math.floor(points / 10) * 10, 800);
  };
  
  // 切換任務類別展開/收起
  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };
  
  // 切換任務完成狀態
  const toggleTask = (categoryId, taskId) => {
    // 這裡用於模擬，實際功能已簡化
    console.log(`Toggle task ${taskId} in category ${categoryId}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
      {/* 慶祝動畫效果 */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#7CFC00'][
                  Math.floor(Math.random() * 5)
                ],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animation: `fall ${Math.random() * 3 + 2}s linear forwards`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-gray-800">
        {/* 頂部標題區 */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">任務與獎勵系統</h1>
          <p className="text-white text-opacity-90 mt-2">完成任務，獲得 Robux 獎勵！</p>
          <p className="text-white text-opacity-80 text-sm mt-1">
            當前月份: {lastReset} | 下次結算: 2025-03-31
          </p>
        </div>
        
        {/* 積分和 Robux 展示 */}
        <div className="flex justify-around p-6 bg-gradient-to-r from-blue-100 to-indigo-100">
          <div className="text-center">
            <span className="block text-3xl font-bold text-blue-600">{points}</span>
            <span className="text-sm text-gray-600">目前積分</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-green-600">{calculateRobux()}</span>
            <span className="text-sm text-gray-600">可兌換 Robux</span>
            <span className="text-xs text-gray-500 block">(上限 800)</span>
          </div>
        </div>
        
        {/* 任務列表 */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">今日任務</h2>
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category.id} className="rounded-xl overflow-hidden shadow-md">
                {/* 類別標題 - 可點擊展開/收起 */}
                <div 
                  className={`p-4 cursor-pointer transition-all duration-300 bg-gradient-to-r ${category.color} text-white flex justify-between items-center`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white mr-3">
                      <span className={`font-bold ${category.textColor}`}>{category.level}</span>
                    </div>
                    <span className="font-bold">{category.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {category.pointValue > 0 ? '+' : ''}{category.pointValue} 分
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-transform ${expandedCategory === category.id ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* 類別下的任務列表 - 僅在展開時顯示 */}
                {expandedCategory === category.id && (
                  <div className={`p-4 ${category.bgColor}`}>
                    {category.tasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 my-2 rounded-lg flex justify-between items-center cursor-pointer transition-all duration-300 
                          ${task.completed 
                            ? `bg-white bg-opacity-90 border-l-4 ${category.borderColor} shadow-md` 
                            : 'bg-white bg-opacity-60 border-l-4 border-transparent hover:bg-opacity-80'
                          }`}
                        onClick={() => toggleTask(category.id, task.id)}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-md mr-3 flex items-center justify-center ${
                            task.completed 
                              ? `${category.bgColor} ${category.borderColor} border-2` 
                              : 'border-2 border-gray-300'
                          }`}>
                            {task.completed && (
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${category.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={`${task.completed ? `${category.textColor} font-medium` : 'text-gray-700'} transition-all duration-300`}>
                            {task.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 兌換按鈕 */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-3 gap-4">
            <button 
              className={`bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-105 ${
                calculateRobux() === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={calculateRobux() === 0}
            >
              兌換 {calculateRobux()} Robux
            </button>
            <button 
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-105"
            >
              重置任務
            </button>
            <button 
              className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-105"
            >
              月底結算
            </button>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            積分兌換規則：每 10 積分可兌換 10 Robux，每月最高兌換 800 Robux
          </div>
        </div>
      </div>
      
      {/* 落下動畫的 CSS */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RobuxRewardSystem;