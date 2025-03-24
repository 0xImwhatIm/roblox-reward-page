import React, { useState, useEffect } from 'react';
import './styles.css'; // 將添加一些基本樣式

function RobuxRewardSystem() {
  const [points, setPoints] = useState(150); // 示例積分值
  const [expandedCategory, setExpandedCategory] = useState('splus');
  const [lastReset, setLastReset] = useState('2025-03');
  const [showConfetti, setShowConfetti] = useState(false);
  const [tasksState, setTasksState] = useState(null);
  
  // 任務等級分類與對應行為
  const categories = [
    {
      id: 'splus',
      level: 'S+',
      name: '超棒棒',
      color: 'bg-gradient-purple',
      bgColor: 'bg-light-purple',
      borderColor: 'border-purple',
      textColor: 'text-purple',
      pointValue: 15,
      tasks: [
        { id: 's1', name: '提出學習計畫', completed: false },
        { id: 's2', name: '完成學習計畫', completed: false },
        { id: 's3', name: '提出假日規劃計畫', completed: false },
        { id: 's4', name: '完成假日規劃計畫', completed: false }
      ]
    },
    {
      id: 'aplus',
      level: 'A+',
      name: '主動很棒',
      color: 'bg-gradient-blue',
      bgColor: 'bg-light-blue',
      borderColor: 'border-blue',
      textColor: 'text-blue',
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
      color: 'bg-gradient-teal',
      bgColor: 'bg-light-teal',
      borderColor: 'border-teal',
      textColor: 'text-teal',
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
      color: 'bg-gradient-green',
      bgColor: 'bg-light-green',
      borderColor: 'border-green',
      textColor: 'text-green',
      pointValue: 2,
      tasks: [
        { id: 'b1', name: '按時作息', completed: false },
        { id: 'b2', name: '刷牙洗臉洗頭', completed: false },
        { id: 'b3', name: '整理餐袋餐具', completed: false },
        { id: 'b4', name: '整理書包', completed: false },
        { id: 'b5', name: '準時完成作業', completed: false }
      ]
    },
    {
      id: 'c',
      level: 'C',
      name: '要注意囉',
      color: 'bg-gradient-yellow',
      bgColor: 'bg-light-yellow',
      borderColor: 'border-yellow',
      textColor: 'text-yellow',
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
      color: 'bg-gradient-red',
      bgColor: 'bg-light-red',
      borderColor: 'border-red',
      textColor: 'text-red',
      pointValue: -8,
      tasks: [
        { id: 'd1', name: '說謊', completed: false },
        { id: 'd2', name: '與他人嚴重衝突', completed: false }
      ]
    }
  ];

  // 初始化任務狀態
  useEffect(() => {
    // 嘗試從本地存儲加載任務狀態
    const savedTasks = localStorage.getItem('robuxTasks');
    const savedPoints = localStorage.getItem('robuxPoints');
    
    if (savedTasks) {
      setTasksState(JSON.parse(savedTasks));
    } else {
      // 如果沒有保存的狀態，初始化
      const initialState = {};
      categories.forEach(cat => {
        cat.tasks.forEach(task => {
          initialState[`${cat.id}-${task.id}`] = false;
        });
      });
      setTasksState(initialState);
      localStorage.setItem('robuxTasks', JSON.stringify(initialState));
    }
    
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }
  }, []);

  // 保存任務狀態到本地存儲
  useEffect(() => {
    if (tasksState) {
      localStorage.setItem('robuxTasks', JSON.stringify(tasksState));
      localStorage.setItem('robuxPoints', points.toString());
    }
  }, [tasksState, points]);
  
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
    if (!tasksState) return;
    
    const taskKey = `${categoryId}-${taskId}`;
    const currentStatus = tasksState[taskKey];
    const category = categories.find(c => c.id === categoryId);
    
    // 更新積分
    if (!currentStatus) {
      // 任務從未完成變為完成，加分
      setPoints(prev => prev + category.pointValue);
      
      // 如果是正面任務且積分增加，顯示慶祝效果
      if (category.pointValue > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      // 任務從完成變為未完成，減分
      setPoints(prev => prev - category.pointValue);
    }
    
    // 更新任務狀態
    setTasksState(prev => ({
      ...prev,
      [taskKey]: !currentStatus
    }));
  };

  // 重置所有任務
  const resetTasks = () => {
    if (window.confirm('確定要重置所有任務嗎？這將清除所有已完成的任務，但不會重置積分。')) {
      const resetState = {};
      Object.keys(tasksState).forEach(key => {
        resetState[key] = false;
      });
      setTasksState(resetState);
    }
  };

  // 月底結算
  const monthlyReset = () => {
    if (window.confirm('確定要進行月底結算嗎？這將清除所有任務並重置積分。')) {
      // 重置所有任務和積分
      const resetState = {};
      Object.keys(tasksState).forEach(key => {
        resetState[key] = false;
      });
      setTasksState(resetState);
      setPoints(0);
      
      // 更新最後重置時間
      const now = new Date();
      const newResetDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      setLastReset(newResetDate);
    }
  };

  // 兌換Robux
  const exchangeRobux = () => {
    const robuxAmount = calculateRobux();
    if (robuxAmount > 0) {
      if (window.confirm(`確定要兌換 ${robuxAmount} Robux 嗎？這將從您的積分中扣除 ${robuxAmount} 點。`)) {
        setPoints(prev => prev - robuxAmount);
        alert(`成功兌換 ${robuxAmount} Robux！`);
        
        // 顯示慶祝效果
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };
  
  // 如果任務狀態尚未加載，顯示加載中
  if (!tasksState) {
    return <div className="loading">加載中...</div>;
  }
  
  return (
    <div className="app-container">
      {/* 慶祝動畫效果 */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4', '#7CFC00'][
                  Math.floor(Math.random() * 5)
                ],
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="reward-card">
        {/* 頂部標題區 */}
        <div className="card-header">
          <h1>任務與獎勵系統</h1>
          <p className="subtitle">完成任務，獲得 Robux 獎勵！</p>
          <p className="date-info">
            當前月份: {lastReset} | 下次結算: {new Date().getFullYear()}-{String(new Date().getMonth() + 2).padStart(2, '0')}-01
          </p>
        </div>
        
        {/* 積分和 Robux 展示 */}
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-value points-value">{points}</span>
            <span className="stat-label">目前積分</span>
          </div>
          <div className="stat-box">
            <span className="stat-value robux-value">{calculateRobux()}</span>
            <span className="stat-label">可兌換 Robux</span>
            <span className="max-note">(上限 800)</span>
          </div>
        </div>
        
        {/* 任務列表 */}
        <div className="tasks-container">
          <h2>今日任務</h2>
          <div className="categories-list">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                {/* 類別標題 - 可點擊展開/收起 */}
                <div 
                  className={`category-header ${category.color}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="category-title">
                    <div className={`level-badge ${category.textColor}`}>
                      <span>{category.level}</span>
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <div className="category-info">
                    <span className="point-badge">
                      {category.pointValue > 0 ? '+' : ''}{category.pointValue} 分
                    </span>
                    <span className={`arrow-icon ${expandedCategory === category.id ? 'rotated' : ''}`}>▼</span>
                  </div>
                </div>
                
                {/* 類別下的任務列表 - 僅在展開時顯示 */}
                {expandedCategory === category.id && (
                  <div className={`tasks-list ${category.bgColor}`}>
                    {category.tasks.map(task => {
                      const isCompleted = tasksState[`${category.id}-${task.id}`];
                      return (
                        <div 
                          key={task.id} 
                          className={`task-item ${isCompleted ? `completed ${category.borderColor}` : ''}`}
                          onClick={() => toggleTask(category.id, task.id)}
                        >
                          <div className="task-checkbox-container">
                            <div className={`task-checkbox ${isCompleted ? `${category.bgColor} ${category.borderColor}` : ''}`}>
                              {isCompleted && (
                                <span className={`checkmark ${category.textColor}`}>✓</span>
                              )}
                            </div>
                            <span className={`task-name ${isCompleted ? category.textColor : ''}`}>
                              {task.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 按鈕區域 */}
        <div className="buttons-container">
          <div className="buttons-grid">
            <button 
              className={`action-button exchange-button ${calculateRobux() === 0 ? 'disabled' : ''}`}
              disabled={calculateRobux() === 0}
              onClick={exchangeRobux}
            >
              兌換 {calculateRobux()} Robux
            </button>
            <button 
              className="action-button reset-button"
              onClick={resetTasks}
            >
              重置任務
            </button>
            <button 
              className="action-button monthly-button"
              onClick={monthlyReset}
            >
              月底結算
            </button>
          </div>
          <div className="rules-text">
            積分兌換規則：每 10 積分可兌換 10 Robux，每月最高兌換 800 Robux
          </div>
        </div>
      </div>
    </div>
  );
}

export default RobuxRewardSystem;
