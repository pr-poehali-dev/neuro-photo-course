import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const CourseEnrollment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const cardNumber = "2204 3204 2826 7423";
  const coursePrice = "2 990 ₽";
  const email = "nailiya.harasova@yandex.ru";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setStep(2);
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/484014cd-9e4f-4a69-ad87-ea6b427c6e7a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: email
        })
      });

      if (response.ok) {
        setStep(3);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 border-primary">Запись на курс</Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Начните обучение
          </h2>
          <p className="text-xl text-muted-foreground">
            Заполните форму и получите доступ к курсу после оплаты
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8">
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <Icon name="User" size={16} className="text-primary" />
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите ваше имя"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Стоимость курса:</span>
                    <span className="text-3xl font-bold gradient-text">{coursePrice}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Icon name="CheckCircle" size={14} className="inline mr-1 text-primary" />
                    Доступ ко всем материалам навсегда
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 hover-scale bg-primary hover:bg-primary/90"
                >
                  Перейти к оплате
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Icon name="CreditCard" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Оплата по СБП</h3>
                  <p className="text-muted-foreground">
                    Переведите {coursePrice} по номеру карты и отправьте подтверждение
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Номер карты для перевода:</p>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-2xl font-bold tracking-wider bg-background/50 px-4 py-3 rounded-lg">
                        {cardNumber}
                      </code>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleCopyCard}
                        className="hover-scale"
                      >
                        <Icon name={copySuccess ? "Check" : "Copy"} size={20} />
                      </Button>
                    </div>
                    {copySuccess && (
                      <p className="text-sm text-primary animate-fade-in">✓ Скопировано!</p>
                    )}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">Сумма к оплате:</p>
                    <p className="text-3xl font-bold gradient-text">{coursePrice}</p>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-secondary flex-shrink-0 mt-1" />
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">После оплаты:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Сделайте скриншот перевода</li>
                        <li>Отправьте на {email}</li>
                        <li>Укажите ваше имя: {formData.name}</li>
                        <li>Ожидайте подтверждение и доступ к курсу</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handlePaymentConfirmation}
                    disabled={isSubmitting}
                    size="lg" 
                    className="w-full text-lg py-6 hover-scale bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Mail" className="mr-2" size={20} />
                        Я оплатил курс
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="w-full"
                  >
                    <Icon name="ArrowLeft" className="mr-2" size={16} />
                    Назад
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-6 py-8 animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Icon name="CheckCircle" size={48} className="text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold gradient-text">Заявка отправлена!</h3>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Мы получили вашу заявку. После подтверждения оплаты вы получите доступ к курсу на указанную почту.
                  </p>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 space-y-2">
                  <p className="font-medium">Ваши данные:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Имя: {formData.name}</p>
                    <p>Телефон: {formData.phone}</p>
                    <p>Email для связи: {email}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setStep(1);
                    setFormData({ name: "", phone: "" });
                  }}
                  variant="outline"
                  className="hover-scale"
                >
                  Вернуться на главную
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CourseEnrollment;