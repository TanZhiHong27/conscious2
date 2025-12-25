'use client';

import { useState, useEffect } from 'react';

type Screen = 'menu' | 'welcome' | 'biometric' | 'religion' | 'assets' | 'documents' | 'executor' | 'witnesses' | 'success';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [icDetected, setIcDetected] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState<'muslim' | 'non-muslim' | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Array<{ name: string; percentage: number }>>([
    { name: 'Mother', percentage: 50 },
    { name: 'Father', percentage: 50 }
  ]);
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({});
  const [witness1Verified, setWitness1Verified] = useState(false);
  const [witness2Verified, setWitness2Verified] = useState(false);
  const [witness1ICInserted, setWitness1ICInserted] = useState(false);
  const [witness2ICInserted, setWitness2ICInserted] = useState(false);
  const [selectedExecutor, setSelectedExecutor] = useState<'smart-contract' | 'amanah-raya' | 'private-individual' | null>(null);

  // Screen 1: Reset IC detection when entering welcome screen
  useEffect(() => {
    if (currentScreen === 'welcome') {
      setIcDetected(false);
    }
  }, [currentScreen]);

  // Screen 2: Reset biometric verification when entering biometric screen
  useEffect(() => {
    if (currentScreen === 'biometric') {
      setBiometricVerified(false);
      setBiometricProgress(0);
    }
  }, [currentScreen]);

  const getScreenNumber = (screen: Screen): number => {
    const order: Screen[] = ['menu', 'welcome', 'biometric', 'religion', 'assets', 'documents', 'executor', 'witnesses', 'success'];
    const index = order.indexOf(screen);
    return index === 0 ? 0 : index; // Menu is screen 0, others start from 1
  };

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: '', percentage: 0 }]);
  };

  const handleRemoveBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  };

  const handleUpdateBeneficiary = (index: number, field: 'name' | 'percentage', value: string | number) => {
    const updated = [...beneficiaries];
    updated[index] = { ...updated[index], [field]: value };
    setBeneficiaries(updated);
  };

  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.percentage, 0);
  const maxPercentage = selectedReligion === 'muslim' ? 33.3 : 100;
  const remaining = maxPercentage - totalPercentage;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Roboto, Inter, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Progress Stepper - Hidden on Menu */}
      {currentScreen !== 'menu' && (
        <div style={{
          backgroundColor: '#003366',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ffd700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#003366',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              JPN
            </div>
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>Digital Will Service</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const screenNum = getScreenNumber(currentScreen);
              const isActive = num === screenNum;
              const isCompleted = num < screenNum;
              return (
                <div key={num} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#ffd700' : isActive ? '#ffffff' : 'rgba(255,255,255,0.3)',
                  color: isCompleted || isActive ? '#003366' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: isActive ? '3px solid #ffd700' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {isCompleted ? '✓' : num}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Screen Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: currentScreen === 'assets' ? 'flex-start' : 'center', 
        justifyContent: 'center', 
        padding: '40px',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}>
        {currentScreen === 'menu' && (
          <div style={{ 
            maxWidth: '1200px', 
            width: '100%',
            textAlign: 'center'
          }}>
            {/* Header */}
            <div style={{ marginBottom: '60px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#003366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '24px'
                }}>
                  JPN
                </div>
                <h1 style={{ 
                  fontSize: '48px', 
                  fontWeight: 700, 
                  color: '#003366',
                  margin: 0
                }}>
                  JPN Digital Kiosk
                </h1>
              </div>
              <p style={{ 
                fontSize: '28px', 
                color: '#666',
                margin: 0
              }}>
                Welcome to JPN Digital Kiosk - Please select a service
              </p>
            </div>

            {/* Service Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {/* Service 1: MyKad Replacement - Disabled */}
              <button
                disabled
                style={{
                  padding: '40px 30px',
                  backgroundColor: '#e0e0e0',
                  border: '3px solid #ccc',
                  borderRadius: '16px',
                  cursor: 'not-allowed',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  opacity: 0.6
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🪪</div>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 600, 
                  color: '#666',
                  margin: '0 0 10px 0'
                }}>
                  MyKad Replacement
                </h3>
                <p style={{ 
                  fontSize: '20px', 
                  color: '#999',
                  margin: 0
                }}>
                  Coming Soon
                </p>
              </button>

              {/* Service 2: Birth Certificate Extract - Disabled */}
              <button
                disabled
                style={{
                  padding: '40px 30px',
                  backgroundColor: '#e0e0e0',
                  border: '3px solid #ccc',
                  borderRadius: '16px',
                  cursor: 'not-allowed',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  opacity: 0.6
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📄</div>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 600, 
                  color: '#666',
                  margin: '0 0 10px 0'
                }}>
                  Birth Certificate Extract
                </h3>
                <p style={{ 
                  fontSize: '20px', 
                  color: '#999',
                  margin: 0
                }}>
                  Coming Soon
                </p>
              </button>

              {/* Service 3: Marriage/Divorce Inquiry - Disabled */}
              <button
                disabled
                style={{
                  padding: '40px 30px',
                  backgroundColor: '#e0e0e0',
                  border: '3px solid #ccc',
                  borderRadius: '16px',
                  cursor: 'not-allowed',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  opacity: 0.6
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>💍</div>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 600, 
                  color: '#666',
                  margin: '0 0 10px 0'
                }}>
                  Marriage/Divorce Inquiry
                </h3>
                <p style={{ 
                  fontSize: '20px', 
                  color: '#999',
                  margin: 0
                }}>
                  Coming Soon
                </p>
              </button>

              {/* Service 4: Digital Will - Active */}
              <button
                onClick={() => setCurrentScreen('welcome')}
                style={{
                  padding: '40px 30px',
                  backgroundColor: '#ffffff',
                  border: '4px solid #003366',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,51,102,0.2)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,51,102,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.2)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#28a745',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: 600
                }}>
                  NEW
                </div>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📜</div>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: 600, 
                  color: '#003366',
                  margin: '0 0 10px 0'
                }}>
                  Digital Will
                </h3>
                <p style={{ 
                  fontSize: '20px', 
                  color: '#666',
                  margin: 0
                }}>
                  Wasiat Digital
                </p>
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'welcome' && (
          <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#003366', marginBottom: '24px' }}>
              Welcome to JPN Digital Will Service
            </h1>
            <p style={{ fontSize: '24px', color: '#666', marginBottom: '20px' }}>
              Please insert your MyKad into the card reader
            </p>
            {!icDetected && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '40px',
                padding: '16px 24px',
                backgroundColor: '#fff3cd',
                borderRadius: '12px',
                border: '2px solid #ffd700',
                maxWidth: '600px',
                margin: '0 auto 40px'
              }}>
                <div style={{ fontSize: '32px', animation: 'pulse 1.5s infinite' }}>👆</div>
                <p style={{ 
                  fontSize: '22px', 
                  color: '#003366', 
                  fontWeight: 600,
                  margin: 0
                }}>
                  Follow the animation to insert your MyKad
                </p>
              </div>
            )}
            
            {/* IC Insertion Animation */}
            <div style={{
              width: '500px',
              height: '400px',
              margin: '0 auto 40px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1000px'
            }}>
              {/* Card Reader Device */}
              <div style={{
                width: '450px',
                height: '320px',
                backgroundColor: '#2a2a2a',
                borderRadius: '20px',
                border: '6px solid #1a1a1a',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 10px rgba(0,0,0,0.3)',
                overflow: 'hidden'
              }}>
                {/* Card Reader Slot Opening */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '340px',
                  height: '240px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  border: '3px solid #0a0a0a',
                  boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)'
                }}>
                  {/* Inner Slot Depth Effect */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    right: '8px',
                    bottom: '8px',
                    backgroundColor: '#0f0f0f',
                    borderRadius: '8px',
                    border: '2px solid #000'
                  }} />
                  
                  {/* MyKad Card - Tutorial Animation */}
                  <div style={{
                    width: '320px',
                    height: '200px',
                    position: 'absolute',
                    left: icDetected ? '10px' : '-360px',
                    top: '20px',
                    transition: icDetected ? 'left 1.2s ease-in-out' : 'none',
                    transform: 'perspective(1000px) rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                    animation: icDetected ? 'none' : 'insertCard 3s ease-in-out infinite'
                  }}>
                    {/* Card Shadow */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      boxShadow: icDetected ? '0 4px 15px rgba(0,0,0,0.5)' : 'none',
                      transition: 'box-shadow 0.3s ease'
                    }} />
                    
                    {/* MyKad Card Body */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#1a2332',
                      borderRadius: '8px',
                      border: '3px solid #2d3a4f',
                      position: 'relative',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                      overflow: 'hidden'
                    }}>
                      {/* MyKad Header - Blue Section */}
                      <div style={{
                        width: '100%',
                        height: '50px',
                        background: 'linear-gradient(135deg, #003366 0%, #004080 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        borderBottom: '2px solid #001f3f'
                      }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          letterSpacing: '1px'
                        }}>
                          MALAYSIA
                        </div>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#ffd700',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px'
                        }}>
                          ⭐
                        </div>
                      </div>
                      
                      {/* Card Content Area */}
                      <div style={{
                        display: 'flex',
                        height: 'calc(100% - 50px)',
                        padding: '8px'
                      }}>
                        {/* Left Side - Photo Area */}
                        <div style={{
                          width: '80px',
                          height: '100%',
                          marginRight: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '60px',
                            height: '75px',
                            backgroundColor: '#2a3441',
                            border: '2px solid #3a4552',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            fontSize: '10px',
                            textAlign: 'center',
                            position: 'relative'
                          }}>
                            <div style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              right: '4px',
                              bottom: '4px',
                              border: '1px solid #1a2332',
                              borderRadius: '2px'
                            }} />
                            PHOTO
                          </div>
                        </div>
                        
                        {/* Right Side - Text Info */}
                        <div style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '4px 0'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '9px',
                              color: '#888',
                              marginBottom: '2px'
                            }}>
                              NAMA / NAME
                            </div>
                            <div style={{
                              fontSize: '11px',
                              color: '#fff',
                              fontWeight: 'bold',
                              marginBottom: '6px'
                            }}>
                              AHMAD BIN ABDULLAH
                            </div>
                          </div>
                          
                          <div>
                            <div style={{
                              fontSize: '9px',
                              color: '#888',
                              marginBottom: '2px'
                            }}>
                              NO. K/P
                            </div>
                            <div style={{
                              fontSize: '11px',
                              color: '#fff',
                              fontWeight: 'bold'
                            }}>
                              901212-01-1234
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Chip */}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        width: '24px',
                        height: '20px',
                        backgroundColor: '#ffd700',
                        borderRadius: '3px',
                        border: '1px solid #ccaa00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
                      }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '2px'
                        }} />
                      </div>
                      
                      {/* Card Shine Effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        animation: icDetected ? 'none' : 'shine 2s infinite',
                        transition: 'left 0.5s ease'
                      }} />
                    </div>
                  </div>
                </div>
                
                {/* Card Reader Status Light */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: icDetected ? '#28a745' : '#ffd700',
                    boxShadow: icDetected ? '0 0 10px #28a745' : '0 0 10px #ffd700',
                    animation: icDetected ? 'none' : 'pulse 1.5s infinite'
                  }} />
                  <span style={{
                    fontSize: '14px',
                    color: '#fff',
                    fontWeight: 600
                  }}>
                    {icDetected ? 'READY' : 'WAITING...'}
                  </span>
                </div>
              </div>
            </div>

            {/* IC Detected Button - Always visible, user clicks when ready */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {!icDetected ? (
                <button
                  onClick={() => setIcDetected(true)}
                  style={{
                    padding: '20px 60px',
                    fontSize: '28px',
                    fontWeight: 600,
                    backgroundColor: '#ffd700',
                    color: '#003366',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255,215,0,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,215,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.4)';
                  }}
                >
                  IC Detected - Click Here
                </button>
              ) : (
                <button
                  onClick={() => setCurrentScreen('biometric')}
                  style={{
                    padding: '20px 60px',
                    fontSize: '28px',
                    fontWeight: 600,
                    backgroundColor: '#28a745',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(40,167,69,0.4)',
                    transition: 'all 0.3s ease',
                    animation: 'pulse 2s infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(40,167,69,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(40,167,69,0.4)';
                  }}
                >
                  ✓ IC Verified - Proceed
                </button>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'biometric' && (
          <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '20px' }}>
              Biometric Verification
            </h2>
            
            {!biometricVerified && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '40px',
                padding: '16px 24px',
                backgroundColor: '#fff3cd',
                borderRadius: '12px',
                border: '2px solid #ffd700',
                maxWidth: '600px',
                margin: '0 auto 40px'
              }}>
                <div style={{ fontSize: '32px', animation: 'pulse 1.5s infinite' }}>👆</div>
                <p style={{ 
                  fontSize: '22px', 
                  color: '#003366', 
                  fontWeight: 600,
                  margin: 0
                }}>
                  Follow the animation to place your thumb
                </p>
              </div>
            )}

            {/* Fingerprint Scanner with Animation */}
            <div style={{
              width: '400px',
              height: '400px',
              margin: '0 auto 40px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Scanner Device */}
              <div style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '8px solid #003366',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                zIndex: 2
              }}>
                {biometricVerified ? (
                  <div style={{ fontSize: '80px', color: '#28a745' }}>✓</div>
                ) : (
                  <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #003366 0%, #003366 30%, transparent 30%)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </div>

              {/* Animated Finger/Thumb */}
              {!biometricVerified && (
                <div style={{
                  position: 'absolute',
                  width: '120px',
                  height: '160px',
                  animation: 'placeFinger 3s ease-in-out infinite',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Thumb Illustration */}
                  <div style={{
                    width: '80px',
                    height: '120px',
                    backgroundColor: '#ffdbac',
                    borderRadius: '40px 40px 20px 20px',
                    border: '3px solid #d4a574',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Fingerprint lines */}
                    <div style={{
                      position: 'absolute',
                      width: '60px',
                      height: '80px',
                      top: '20px',
                      borderRadius: '30px',
                      background: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0,0,0,0.1) 2px,
                          rgba(0,0,0,0.1) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0,0,0,0.1) 2px,
                          rgba(0,0,0,0.1) 4px
                        )
                      `
                    }} />
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '28px', color: '#333', marginBottom: '30px' }}>
              {biometricVerified ? 'Identity Verified' : 'Please place your right thumb on the scanner'}
            </p>

            {/* Detection Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {!biometricVerified ? (
                <button
                  onClick={() => setBiometricVerified(true)}
                  style={{
                    padding: '20px 60px',
                    fontSize: '28px',
                    fontWeight: 600,
                    backgroundColor: '#ffd700',
                    color: '#003366',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(255,215,0,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,215,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.4)';
                  }}
                >
                  Fingerprint Detected - Click Here
                </button>
              ) : (
                <button
                  onClick={() => setCurrentScreen('religion')}
                  style={{
                    padding: '20px 60px',
                    fontSize: '28px',
                    fontWeight: 600,
                    backgroundColor: '#28a745',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(40,167,69,0.4)',
                    transition: 'all 0.3s ease',
                    animation: 'pulse 2s infinite'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(40,167,69,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(40,167,69,0.4)';
                  }}
                >
                  ✓ Verified - Proceed
                </button>
              )}
            </div>
          </div>
        )}

        {currentScreen === 'religion' && (
          <div style={{ textAlign: 'center', maxWidth: '900px', width: '100%' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '20px' }}>
              User Profile
            </h2>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '30px',
              borderRadius: '16px',
              marginBottom: '40px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '28px', color: '#333', marginBottom: '10px' }}>
                <strong>Name:</strong> Ahmad bin Abdullah
              </p>
              <p style={{ fontSize: '24px', color: '#666' }}>
                <strong>IC Number:</strong> 901212-01-1234
              </p>
            </div>

            <p style={{ fontSize: '28px', color: '#333', marginBottom: '40px' }}>
              Please select your religion (This will be read from IC in final version)
            </p>

            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setSelectedReligion('muslim');
                  setCurrentScreen('assets');
                }}
                style={{
                  padding: '30px 60px',
                  fontSize: '32px',
                  fontWeight: 600,
                  backgroundColor: selectedReligion === 'muslim' ? '#003366' : '#ffffff',
                  color: selectedReligion === 'muslim' ? '#ffffff' : '#003366',
                  border: '4px solid #003366',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  minWidth: '300px'
                }}
              >
                Muslim
              </button>
              <button
                onClick={() => {
                  setSelectedReligion('non-muslim');
                  setCurrentScreen('assets');
                }}
                style={{
                  padding: '30px 60px',
                  fontSize: '32px',
                  fontWeight: 600,
                  backgroundColor: selectedReligion === 'non-muslim' ? '#003366' : '#ffffff',
                  color: selectedReligion === 'non-muslim' ? '#ffffff' : '#003366',
                  border: '4px solid #003366',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  minWidth: '300px'
                }}
              >
                Non-Muslim
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'assets' && (
          <div style={{ 
            maxWidth: '1000px', 
            width: '100%',
            paddingBottom: '40px'
          }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '30px', textAlign: 'center' }}>
              Asset Distribution
            </h2>

            {selectedReligion === 'muslim' && (
              <div style={{
                backgroundColor: '#fff3cd',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '30px',
                border: '2px solid #ffd700'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '32px' }}>ℹ️</span>
                  <h3 style={{ fontSize: '28px', color: '#003366', margin: 0 }}>Wasiat 1/3 Rule</h3>
                </div>
                <p style={{ fontSize: '20px', color: '#333', lineHeight: '1.6' }}>
                  Under Islamic law (Faraid), 2/3 of your assets are automatically allocated to your Quranic heirs.
                  You can only distribute <strong>33.3% (1/3)</strong> of your total assets through Wasiat.
                </p>
              </div>
            )}

            <div style={{
              backgroundColor: '#ffffff',
              padding: '40px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 600, color: '#333' }}>
                    {selectedReligion === 'muslim' ? 'Wasiat Portion (1/3)' : 'Total Assets'} Allocation
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#003366' }}>
                    {selectedReligion === 'muslim' 
                      ? `${totalPercentage.toFixed(1)}% / 100%`
                      : `${totalPercentage.toFixed(1)}% / ${maxPercentage}%`
                    }
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '24px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${selectedReligion === 'muslim' ? totalPercentage : (totalPercentage / maxPercentage) * 100}%`,
                    height: '100%',
                    backgroundColor: selectedReligion === 'muslim' 
                      ? (Math.abs(totalPercentage - 100) <= 0.1 ? '#28a745' : '#003366')
                      : (Math.abs(totalPercentage - maxPercentage) <= 0.1 ? '#28a745' : '#003366'),
                    transition: 'width 0.3s ease',
                    borderRadius: '12px'
                  }} />
                </div>
                {remaining > 0 && (
                  <p style={{ fontSize: '18px', color: '#666', marginTop: '8px' }}>
                    Remaining: {selectedReligion === 'muslim' 
                      ? `${(100 - totalPercentage).toFixed(1)}%`
                      : `${remaining.toFixed(1)}%`
                    }
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '30px' }}>
                {beneficiaries.map((ben, index) => {
                  const displayMax = selectedReligion === 'muslim' ? 100 : maxPercentage;
                  const maxAllowedForThis = displayMax - (totalPercentage - ben.percentage);
                  const canIncrease = maxAllowedForThis > ben.percentage + 0.01;
                  
                  return (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '20px',
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '12px'
                    }}>
                      <input
                        type="text"
                        value={ben.name}
                        onChange={(e) => handleUpdateBeneficiary(index, 'name', e.target.value)}
                        placeholder="Beneficiary Name"
                        style={{
                          flex: 1,
                          padding: '16px',
                          fontSize: '22px',
                          border: '2px solid #ddd',
                          borderRadius: '8px',
                          outline: 'none'
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => handleUpdateBeneficiary(index, 'percentage', Math.max(0, ben.percentage - 1))}
                          style={{
                            width: '50px',
                            height: '50px',
                            fontSize: '28px',
                            backgroundColor: '#dc3545',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={ben.percentage}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            const displayMax = selectedReligion === 'muslim' ? 100 : maxPercentage;
                            const maxAllowed = displayMax - (totalPercentage - ben.percentage);
                            handleUpdateBeneficiary(index, 'percentage', Math.min(maxAllowed, Math.max(0, value)));
                          }}
                          min="0"
                          max={selectedReligion === 'muslim' ? 100 : maxPercentage}
                          step="0.1"
                          style={{
                            width: '100px',
                            padding: '12px',
                            fontSize: '24px',
                            fontWeight: 600,
                            textAlign: 'center',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            outline: 'none'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#003366';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#ddd';
                          }}
                        />
                        <span style={{ fontSize: '24px', fontWeight: 600 }}>%</span>
                        <button
                          onClick={() => {
                            if (canIncrease) {
                              const displayMax = selectedReligion === 'muslim' ? 100 : maxPercentage;
                              const maxAllowed = displayMax - (totalPercentage - ben.percentage);
                              const newValue = Math.min(maxAllowed, ben.percentage + 1);
                              handleUpdateBeneficiary(index, 'percentage', newValue);
                            }
                          }}
                          disabled={!canIncrease}
                          style={{
                            width: '50px',
                            height: '50px',
                            fontSize: '28px',
                            backgroundColor: canIncrease ? '#28a745' : '#ccc',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: canIncrease ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold'
                          }}
                        >
                          +
                        </button>
                      </div>
                      {beneficiaries.length > 1 && (
                        <button
                          onClick={() => handleRemoveBeneficiary(index)}
                          style={{
                            padding: '12px 24px',
                            fontSize: '20px',
                            backgroundColor: '#dc3545',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleAddBeneficiary}
                disabled={selectedReligion === 'muslim' 
                  ? (100 - totalPercentage) < 0.1
                  : remaining < 0.1
                }
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '24px',
                  fontWeight: 600,
                  backgroundColor: selectedReligion === 'muslim'
                    ? ((100 - totalPercentage) < 0.1 ? '#ccc' : '#003366')
                    : (remaining < 0.1 ? '#ccc' : '#003366'),
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: selectedReligion === 'muslim'
                    ? ((100 - totalPercentage) < 0.1 ? 'not-allowed' : 'pointer')
                    : (remaining < 0.1 ? 'not-allowed' : 'pointer'),
                  marginBottom: '30px'
                }}
              >
                + Add Beneficiary
              </button>

              <button
                onClick={() => setCurrentScreen('documents')}
                disabled={selectedReligion === 'muslim' 
                  ? Math.abs(totalPercentage - 100) > 0.1
                  : Math.abs(totalPercentage - maxPercentage) > 0.1
                }
                style={{
                  width: '100%',
                  padding: '24px',
                  fontSize: '28px',
                  fontWeight: 600,
                  backgroundColor: selectedReligion === 'muslim'
                    ? (Math.abs(totalPercentage - 100) <= 0.1 ? '#28a745' : '#ccc')
                    : (Math.abs(totalPercentage - maxPercentage) <= 0.1 ? '#28a745' : '#ccc'),
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: selectedReligion === 'muslim'
                    ? (Math.abs(totalPercentage - 100) <= 0.1 ? 'pointer' : 'not-allowed')
                    : (Math.abs(totalPercentage - maxPercentage) <= 0.1 ? 'pointer' : 'not-allowed')
                }}
              >
                Continue to Document Upload
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'documents' && (
          <div style={{ maxWidth: '1000px', width: '100%' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '40px', textAlign: 'center' }}>
              Document Evidence Upload
            </h2>
            <p style={{ fontSize: '24px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
              Upload supporting documents for your assets
            </p>
            <p style={{ fontSize: '20px', color: '#999', marginBottom: '40px', textAlign: 'center', fontStyle: 'italic' }}>
              (Optional - You may proceed without uploading documents)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                { id: 'land', label: 'Land Title', icon: '🏠' },
                { id: 'vehicle', label: 'Vehicle Grant', icon: '🚗' },
                { id: 'bank', label: 'Bank Statement', icon: '💰' }
              ].map((doc) => (
                <div key={doc.id} style={{
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ fontSize: '48px' }}>{doc.icon}</span>
                    <span style={{ fontSize: '28px', fontWeight: 600, color: '#333' }}>{doc.label}</span>
                  </div>
                  {uploadedDocs[doc.id] ? (
                    <div style={{
                      padding: '16px 32px',
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      borderRadius: '12px',
                      fontSize: '24px',
                      fontWeight: 600
                    }}>
                      ✓ Uploaded
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setUploadedDocs({ ...uploadedDocs, [doc.id]: true });
                      }}
                      style={{
                        padding: '16px 40px',
                        fontSize: '24px',
                        fontWeight: 600,
                        backgroundColor: '#003366',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Upload File
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreen('executor')}
              style={{
                width: '100%',
                marginTop: '40px',
                padding: '24px',
                fontSize: '28px',
                fontWeight: 600,
                backgroundColor: '#003366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,51,102,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.3)';
              }}
            >
              {Object.keys(uploadedDocs).length > 0 
                ? `Continue to Executor Selection (${Object.keys(uploadedDocs).length} document${Object.keys(uploadedDocs).length > 1 ? 's' : ''} uploaded)`
                : 'Continue to Executor Selection (Skip Documents)'
              }
            </button>
          </div>
        )}

        {currentScreen === 'executor' && (
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '20px', textAlign: 'center' }}>
              Select Digital Executor
            </h2>
            <p style={{ fontSize: '24px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>
              Choose who will be responsible for unlocking and executing your will upon confirmed death.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
              {/* Option 1: The Smart Contract */}
              <button
                onClick={() => setSelectedExecutor('smart-contract')}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  borderRadius: '16px',
                  border: selectedExecutor === 'smart-contract' ? '4px solid #003366' : '2px solid #ddd',
                  boxShadow: selectedExecutor === 'smart-contract' 
                    ? '0 4px 12px rgba(0,51,102,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (selectedExecutor !== 'smart-contract') {
                    e.currentTarget.style.borderColor = '#003366';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedExecutor !== 'smart-contract') {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    flexShrink: 0
                  }}>
                    🔒
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '32px', 
                      fontWeight: 700, 
                      color: '#003366', 
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      The Smart Contract
                    </h3>
                    <p style={{ 
                      fontSize: '22px', 
                      color: '#666', 
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      Automated digital executor that unlocks your will once death is confirmed through official government channels.
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2: Amanah Raya (Recommended) */}
              <button
                onClick={() => setSelectedExecutor('amanah-raya')}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  borderRadius: '16px',
                  border: selectedExecutor === 'amanah-raya' ? '4px solid #003366' : '2px solid #ddd',
                  boxShadow: selectedExecutor === 'amanah-raya' 
                    ? '0 4px 12px rgba(0,51,102,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (selectedExecutor !== 'amanah-raya') {
                    e.currentTarget.style.borderColor = '#003366';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedExecutor !== 'amanah-raya') {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#28a745',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '20px',
                  fontWeight: 600
                }}>
                  Recommended
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    flexShrink: 0
                  }}>
                    🏛️
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '32px', 
                      fontWeight: 700, 
                      color: '#003366', 
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      Amanah Raya
                    </h3>
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ 
                        fontSize: '22px', 
                        color: '#666', 
                        lineHeight: '1.6',
                        margin: '0 0 8px 0'
                      }}>
                        Government-backed trustee
                      </p>
                      <ul style={{ 
                        fontSize: '20px', 
                        color: '#666', 
                        lineHeight: '1.8',
                        margin: 0,
                        paddingLeft: '24px'
                      }}>
                        <li>Automatic verification through JPN</li>
                        <li>Legally recognized and protected</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </button>

              {/* Option 3: Private Individual */}
              <button
                onClick={() => setSelectedExecutor('private-individual')}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  borderRadius: '16px',
                  border: selectedExecutor === 'private-individual' ? '4px solid #003366' : '2px solid #ddd',
                  boxShadow: selectedExecutor === 'private-individual' 
                    ? '0 4px 12px rgba(0,51,102,0.3)' 
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (selectedExecutor !== 'private-individual') {
                    e.currentTarget.style.borderColor = '#003366';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedExecutor !== 'private-individual') {
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    flexShrink: 0
                  }}>
                    👤
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '32px', 
                      fontWeight: 700, 
                      color: '#003366', 
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      Private Individual
                    </h3>
                    <p style={{ 
                      fontSize: '22px', 
                      color: '#666', 
                      lineHeight: '1.6',
                      margin: '0 0 8px 0'
                    }}>
                      Appoint a trusted person (e.g., Spouse, Child, or Lawyer).
                    </p>
                    <p style={{ 
                      fontSize: '20px', 
                      color: '#999', 
                      lineHeight: '1.6',
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      Requirements: Executor must use the JPN Verification App; Requires biometric verification for access.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {selectedExecutor && (
              <button
                onClick={() => setCurrentScreen('witnesses')}
                style={{
                  width: '100%',
                  padding: '24px',
                  fontSize: '28px',
                  fontWeight: 600,
                  backgroundColor: '#003366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,51,102,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.3)';
                }}
              >
                Confirm Selection
              </button>
            )}
          </div>
        )}

        {currentScreen === 'witnesses' && (
          <div style={{ maxWidth: '1200px', width: '100%' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#003366', marginBottom: '20px', textAlign: 'center' }}>
              Witness Authentication
            </h2>
            <p style={{ fontSize: '24px', color: '#666', marginBottom: '40px', textAlign: 'center' }}>
              Two (2) Witnesses are required to validate this Will
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
              {[
                { 
                  id: 1, 
                  verified: witness1Verified, 
                  setVerified: setWitness1Verified,
                  icInserted: witness1ICInserted,
                  setICInserted: setWitness1ICInserted
                },
                { 
                  id: 2, 
                  verified: witness2Verified, 
                  setVerified: setWitness2Verified,
                  icInserted: witness2ICInserted,
                  setICInserted: setWitness2ICInserted
                }
              ].map((witness) => (
                <div key={witness.id} style={{
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: witness.verified ? '4px solid #28a745' : witness.icInserted ? '4px solid #ffd700' : '2px solid #ddd'
                }}>
                  <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#003366', marginBottom: '30px', textAlign: 'center' }}>
                    Witness {witness.id}
                  </h3>
                  
                  {witness.verified ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '120px',
                        height: '120px',
                        margin: '0 auto 20px',
                        borderRadius: '50%',
                        backgroundColor: '#d4edda',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '64px',
                        color: '#28a745'
                      }}>
                        ✓
                      </div>
                      <p style={{ fontSize: '24px', color: '#28a745', fontWeight: 600 }}>
                        Verified
          </p>
        </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Step 1: Insert IC */}
                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          marginBottom: '12px' 
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: witness.icInserted ? '#28a745' : '#003366',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}>
                            {witness.icInserted ? '✓' : '1'}
                          </div>
                          <span style={{ 
                            fontSize: '20px', 
                            fontWeight: 600, 
                            color: witness.icInserted ? '#28a745' : '#333'
                          }}>
                            {witness.icInserted ? 'IC Inserted' : 'Step 1: Insert IC'}
                          </span>
                        </div>
                        {!witness.icInserted && (
                          <button
                            onClick={() => {
                              witness.setICInserted(true);
                            }}
                            style={{
                              width: '100%',
                              padding: '20px',
                              fontSize: '24px',
                              fontWeight: 600,
                              backgroundColor: '#003366',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,51,102,0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.3)';
                            }}
                          >
                            Insert IC
                          </button>
                        )}
                        {witness.icInserted && (
                          <div style={{
                            padding: '16px',
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            borderRadius: '12px',
                            fontSize: '20px',
                            fontWeight: 600,
                            textAlign: 'center'
                          }}>
                            ✓ IC Detected
                          </div>
                        )}
                      </div>

                      {/* Step 2: Scan Fingerprint */}
                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          marginBottom: '12px' 
                        }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: witness.verified ? '#28a745' : witness.icInserted ? '#ffd700' : '#ccc',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}>
                            {witness.verified ? '✓' : '2'}
                          </div>
                          <span style={{ 
                            fontSize: '20px', 
                            fontWeight: 600, 
                            color: witness.verified ? '#28a745' : witness.icInserted ? '#333' : '#999'
                          }}>
                            {witness.verified ? 'Fingerprint Verified' : 'Step 2: Scan Fingerprint'}
                          </span>
                        </div>
                        {witness.icInserted && !witness.verified && (
                          <button
                            onClick={() => {
                              witness.setVerified(true);
                            }}
                            style={{
                              width: '100%',
                              padding: '20px',
                              fontSize: '24px',
                              fontWeight: 600,
                              backgroundColor: '#ffd700',
                              color: '#003366',
                              border: 'none',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(255,215,0,0.3)',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,215,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.3)';
                            }}
                          >
                            Scan Fingerprint
                          </button>
                        )}
                        {!witness.icInserted && (
                          <div style={{
                            padding: '16px',
                            backgroundColor: '#f8f9fa',
                            color: '#999',
                            borderRadius: '12px',
                            fontSize: '20px',
                            fontWeight: 600,
                            textAlign: 'center',
                            border: '2px dashed #ddd'
                          }}>
                            Complete Step 1 first
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreen('success')}
              disabled={!witness1Verified || !witness2Verified}
              style={{
                width: '100%',
                padding: '24px',
                fontSize: '28px',
                fontWeight: 600,
                backgroundColor: witness1Verified && witness2Verified ? '#28a745' : '#ccc',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: witness1Verified && witness2Verified ? 'pointer' : 'not-allowed'
              }}
            >
              Complete Registration
            </button>
          </div>
        )}

        {currentScreen === 'success' && (
          <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
            <div style={{
              width: '200px',
              height: '200px',
              margin: '0 auto 40px',
              borderRadius: '50%',
              backgroundColor: '#d4edda',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '120px',
              color: '#28a745',
              boxShadow: '0 8px 24px rgba(40,167,69,0.3)'
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#28a745', marginBottom: '30px' }}>
              Will Successfully Registered with JPN
            </h2>
            <p style={{ fontSize: '28px', color: '#333', marginBottom: '40px', lineHeight: '1.6' }}>
              Please remove your MyKad.<br />
              A confirmation has been sent to your registered email.
            </p>
            <button
              onClick={() => {
                // Reset all state
                setCurrentScreen('welcome');
                setIcDetected(false);
                setBiometricProgress(0);
                setBiometricVerified(false);
                setSelectedReligion(null);
                setBeneficiaries([
                  { name: 'Mother', percentage: 50 },
                  { name: 'Father', percentage: 50 }
                ]);
                setUploadedDocs({});
                setWitness1Verified(false);
                setWitness2Verified(false);
                setSelectedExecutor(null);
              }}
              style={{
                padding: '24px 60px',
                fontSize: '28px',
                fontWeight: 600,
                backgroundColor: '#003366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,51,102,0.3)'
              }}
            >
              Finish / Return to Home
            </button>
          </div>
        )}
        </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
