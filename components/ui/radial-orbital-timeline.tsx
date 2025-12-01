"use client";

import { useState, useEffect, useRef } from "react";

import { ArrowRight, Link, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/Button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {

  id: number;

  title: string;

  date: string;

  content: string;

  category: string;

  icon: React.ElementType;

  relatedIds: number[];

  status: "completed" | "in-progress" | "pending";

  energy: number;

}

interface RadialOrbitalTimelineProps {

  timelineData: TimelineItem[];

}

export default function RadialOrbitalTimeline({

  timelineData,

}: RadialOrbitalTimelineProps) {

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(

    {}

  );

  const [viewMode, setViewMode] = useState<"orbital">("orbital");

  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});

  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({

    x: 0,

    y: 0,

  });

  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const orbitRef = useRef<HTMLDivElement>(null);

  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {

    if (e.target === containerRef.current || e.target === orbitRef.current) {

      setExpandedItems({});

      setActiveNodeId(null);

      setPulseEffect({});

      setAutoRotate(true);

    }

  };

  const toggleItem = (id: number) => {

    setExpandedItems((prev) => {

      const newState = { ...prev };

      Object.keys(newState).forEach((key) => {

        if (parseInt(key) !== id) {

          newState[parseInt(key)] = false;

        }

      });

      newState[id] = !prev[id];

      if (!prev[id]) {

        setActiveNodeId(id);

        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);

        const newPulseEffect: Record<number, boolean> = {};

        relatedItems.forEach((relId) => {

          newPulseEffect[relId] = true;

        });

        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);

      } else {

        setActiveNodeId(null);

        setAutoRotate(true);

        setPulseEffect({});

      }

      return newState;

    });

  };

  useEffect(() => {

    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {

      rotationTimer = setInterval(() => {

        setRotationAngle((prev) => {

          const newAngle = (prev + 0.3) % 360;

          return Number(newAngle.toFixed(3));

        });

      }, 50);

    }

    return () => {

      if (rotationTimer) {

        clearInterval(rotationTimer);

      }

    };

  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {

    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);

    const totalNodes = timelineData.length;

    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);

  };

  const calculateNodePosition = (index: number, total: number) => {

    const angle = ((index / total) * 360 + rotationAngle) % 360;

    const radius = 320;

    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;

    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));

    const opacity = 1;

    return { x, y, angle, zIndex, opacity };

  };

  const getRelatedItems = (itemId: number): number[] => {

    const currentItem = timelineData.find((item) => item.id === itemId);

    return currentItem ? currentItem.relatedIds : [];

  };

  const isRelatedToActive = (itemId: number): boolean => {

    if (!activeNodeId) return false;

    const relatedItems = getRelatedItems(activeNodeId);

    return relatedItems.includes(itemId);

  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {

    switch (status) {

      case "completed":

        return "text-primary-bg bg-highlight-gold border-highlight-gold";

      case "in-progress":

        return "text-white bg-accent-blue border-accent-blue";

      case "pending":

        return "text-white bg-primary-bg/40 border-accent-blue/50";

      default:

        return "text-white bg-primary-bg/40 border-accent-blue/50";

    }

  };

  return (

    <div

      className="w-full h-screen flex flex-col items-center justify-center bg-primary-bg overflow-hidden"

      ref={containerRef}

      onClick={handleContainerClick}

    >

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">

        <div

          className="absolute w-full h-full flex items-center justify-center"

          ref={orbitRef}

          style={{

            perspective: "1000px",

            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,

          }}

        >

          {/* Line connecting node to center */}
          {activeNodeId !== null && (() => {
            const activeIndex = timelineData.findIndex((item) => item.id === activeNodeId);
            const activePosition = calculateNodePosition(activeIndex, timelineData.length);
            const nodeX = activePosition.x;
            const nodeY = activePosition.y;
            const length = Math.sqrt(nodeX * nodeX + nodeY * nodeY);
            const angle = Math.atan2(nodeY, nodeX) * (180 / Math.PI);
            
            return (
              <div
                className="absolute pointer-events-none z-5"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${length}px`,
                  height: '2px',
                  transformOrigin: '0 50%',
                  transform: `translate(0, -50%) rotate(${angle}deg)`,
                  background: 'repeating-linear-gradient(to right, rgba(218, 166, 39, 0.5) 0px, rgba(218, 166, 39, 0.5) 8px, transparent 8px, transparent 16px)',
                }}
              />
            );
          })()}

          <div className="absolute flex items-center justify-center z-10">
            {activeNodeId === null ? (
              <div className="font-bold text-5xl md:text-6xl tracking-wider" style={{ color: '#daa627' }}>Action</div>
            ) : (
              <div className="flex flex-col items-center">
                {(() => {
                  const activeItem = timelineData.find((item) => item.id === activeNodeId);
                  if (!activeItem) return null;
                  
                  return (
                    <Card className="w-80 bg-primary-bg/90 backdrop-blur-lg border-accent-blue/30 shadow-xl shadow-highlight-gold/10 overflow-visible z-20">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <Badge
                              className={`px-3 text-sm ${getStatusStyles(activeItem.status)}`}
                            >
                              {activeItem.status === "completed"
                                ? "COMPLETE"
                                : activeItem.status === "in-progress"
                                ? "IN PROGRESS"
                                : "PENDING"}
                            </Badge>
                            <span className="text-sm font-mono text-white/50">
                              {activeItem.date}
                            </span>
                          </div>
                          <CardTitle className="text-base mt-2 text-white">
                            {activeItem.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-white/80">
                          <p>{activeItem.content}</p>
                          <div className="mt-4 pt-3 border-t border-accent-blue/10">
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span className="flex items-center text-white/70">
                                <Zap size={14} className="mr-1 text-highlight-gold" />
                                Energy Level
                              </span>
                              <span className="font-mono text-highlight-gold">{activeItem.energy}%</span>
                            </div>
                            <div className="w-full h-1 bg-accent-blue/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-accent-blue to-highlight-gold"
                                style={{ width: `${activeItem.energy}%` }}
                              ></div>
                            </div>
                          </div>
                          {activeItem.relatedIds.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-accent-blue/10">
                              <div className="flex items-center mb-2">
                                <Link size={14} className="text-accent-blue mr-1" />
                                <h4 className="text-sm uppercase tracking-wider font-medium text-white/70">
                                  Connected Nodes
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {activeItem.relatedIds.map((relatedId) => {
                                  const relatedItem = timelineData.find(
                                    (i) => i.id === relatedId
                                  );
                                  return (
                                    <Button
                                      key={relatedId}
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center h-7 px-3 py-0 text-sm rounded-none border-accent-blue/20 bg-transparent hover:bg-accent-blue/10 text-white/80 hover:text-white transition-all"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleItem(relatedId);
                                      }}
                                    >
                                      {relatedItem?.title}
                                      <ArrowRight
                                        size={12}
                                        className="ml-1 text-accent-blue"
                                      />
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="absolute w-[640px] h-[640px] rounded-full border border-accent-blue/10"></div>

          {timelineData.map((item, index) => {

            const position = calculateNodePosition(index, timelineData.length);

            const isExpanded = expandedItems[item.id];

            const isRelated = isRelatedToActive(item.id);

            const isPulsing = pulseEffect[item.id];

            const Icon = item.icon;

            const nodeStyle = {

              transform: `translate(${position.x}px, ${position.y}px)`,

              zIndex: isExpanded ? 200 : position.zIndex,

              opacity: isExpanded ? 1 : position.opacity,

            };

            return (

              <div

                key={item.id}

                ref={(el) => (nodeRefs.current[item.id] = el)}

                className="absolute transition-all duration-700 cursor-pointer"

                style={nodeStyle}

                onClick={(e) => {

                  e.stopPropagation();

                  toggleItem(item.id);

                }}

              >

                <div

                  className={`absolute rounded-full -inset-1 ${

                    isPulsing ? "animate-pulse duration-1000" : ""

                  }`}

                  style={{

                    background: `radial-gradient(circle, rgba(218,166,39,0.2) 0%, rgba(0,127,255,0) 70%)`,

                    width: `${item.energy * 0.5 + 80}px`,

                    height: `${item.energy * 0.5 + 80}px`,

                    left: `-${(item.energy * 0.5 + 80 - 80) / 2}px`,

                    top: `-${(item.energy * 0.5 + 80 - 80) / 2}px`,

                  }}

                ></div>

                <div

                  className={`

                  w-20 h-20 rounded-full flex items-center justify-center

                  ${

                    isExpanded

                      ? "bg-highlight-gold text-primary-bg"

                      : isRelated

                      ? "bg-highlight-gold/50 text-primary-bg"

                      : "bg-accent-blue text-white"

                  }

                  border-2 

                  ${

                    isExpanded

                      ? "border-highlight-gold shadow-lg shadow-highlight-gold/30"

                      : isRelated

                      ? "border-highlight-gold animate-pulse"

                      : "border-accent-blue/40"

                  }

                  transition-all duration-300 transform

                  ${isExpanded ? "scale-150" : ""}

                `}

                >

                  <Icon size={32} />

                </div>

                <div

                  className={`

                  absolute whitespace-nowrap left-1/2 -translate-x-1/2

                  text-base font-semibold tracking-wider

                  transition-all duration-300

                  ${isExpanded ? "text-highlight-gold scale-125 top-28" : "text-white/70 top-24"}

                `}

                >

                  {item.title}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}
