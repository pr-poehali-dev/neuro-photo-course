import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import CourseEnrollment from "@/components/CourseEnrollment";

const Index = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const modules = [
    {
      number: "01",
      title: "Основы работы с нейросетями",
      description: "Знакомство с популярными AI-инструментами для генерации изображений. Изучаем интерфейсы и базовые функции.",
      duration: "2 часа",
      tasks: 3,
      icon: "Sparkles",
      lessons: [
        { 
          title: "Что такое AI-фотосессии и как они работают", 
          description: "Узнайте, как нейросети создают реалистичные фото и почему это будущее фотографии"
        },
        { 
          title: "Регистрируемся в Midjourney за 5 минут", 
          description: "Пошаговая инструкция: от создания аккаунта до первой генерации"
        },
        { 
          title: "Интерфейс и основные команды", 
          description: "Разберём, как управлять нейросетью: кнопки, настройки, параметры"
        },
        { 
          title: "Создаём первый портрет с нуля", 
          description: "Практика: вводим простой запрос, получаем результат и улучшаем его"
        }
      ]
    },
    {
      number: "02",
      title: "Создание промтов для фотосессий",
      description: "Учимся составлять детальные запросы для получения профессиональных результатов. Работа со стилями и композицией.",
      duration: "3 часа",
      tasks: 5,
      icon: "Wand2",
      lessons: [
        { 
          title: "Формула идеального промта: 5 компонентов", 
          description: "Четкая структура: объект + стиль + освещение + ракурс + детали"
        },
        { 
          title: "Fashion и Beauty: разбираем конкретные примеры", 
          description: "Копируйте готовые промты для модных портретов и beauty-съёмок"
        },
        { 
          title: "Свет и тень: как управлять освещением", 
          description: "Студийный свет, золотой час, драматический свет — всё через слова"
        },
        { 
          title: "Параметры --ar, --stylize, --chaos", 
          description: "Как настроить пропорции, стилизацию и креативность AI"
        },
        { 
          title: "Создаём 10 разных портретов", 
          description: "Практика: экспериментируем со стилями, создаём свою коллекцию"
        }
      ]
    },
    {
      number: "03",
      title: "Профессиональная обработка",
      description: "Техники постобработки AI-изображений. Доводим результат до совершенства и создаём портфолио работ.",
      duration: "2.5 часа",
      tasks: 4,
      icon: "Palette",
      lessons: [
        { 
          title: "Увеличиваем разрешение до 4K", 
          description: "Инструменты Upscale в Midjourney + бесплатные сервисы для улучшения"
        },
        { 
          title: "Исправляем недочёты AI: руки, лицо, детали", 
          description: "Простые способы ретуши без Photoshop — через онлайн-сервисы"
        },
        { 
          title: "Добавляем цветовые фильтры и эффекты", 
          description: "Создаём уникальный стиль: винтаж, кино, минимализм"
        },
        { 
          title: "Собираем портфолио и публикуем", 
          description: "Как оформить, где разместить и как начать зарабатывать на AI-фото"
        }
      ]
    }
  ];

  const studentWorks = [
    { 
      id: 1, 
      style: "Fashion портрет",
      image: "https://cdn.poehali.dev/projects/cbe0e5c5-2ef9-4b9c-9b38-b491361909a0/files/41769d84-c8e3-4c05-8671-2184cbafaf89.jpg",
      description: "Профессиональная студийная съёмка с идеальным освещением"
    },
    { 
      id: 2, 
      style: "Арт-концепт",
      image: "https://cdn.poehali.dev/projects/cbe0e5c5-2ef9-4b9c-9b38-b491361909a0/files/7db46352-cbb4-4494-ba97-745b5bb77fbc.jpg",
      description: "Креативный подход с драматическим освещением"
    },
    { 
      id: 3, 
      style: "Студийная съёмка",
      image: "https://cdn.poehali.dev/projects/cbe0e5c5-2ef9-4b9c-9b38-b491361909a0/files/1a21464e-61bc-4734-9517-5e084b17a9a3.jpg",
      description: "Элегантный beauty-портрет в студийных условиях"
    },
    { 
      id: 4, 
      style: "Креативный портрет",
      image: "https://cdn.poehali.dev/projects/cbe0e5c5-2ef9-4b9c-9b38-b491361909a0/files/0a8eff14-924a-4371-b6e5-26ce38db7870.jpg",
      description: "Смелый авангардный стиль с яркими акцентами"
    }
  ];

  const prompts = [
    "Модные fashion-портреты",
    "Студийные фотосессии",
    "Креативные концепты",
    "Lifestyle съёмки",
    "Бьюти-портреты"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed top-20 left-10 w-96 h-96 bg-primary rounded-full art-blob animate-float" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-secondary rounded-full art-blob animate-pulse-slow" />
      <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-accent rounded-full art-blob" style={{ transform: 'translate(-50%, -50%)' }} />

      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 px-6 py-2 text-base bg-primary/20 border-primary hover:bg-primary/30">
              Онлайн-курс
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text leading-tight">
              Нейрофотосессия
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Создавай профессиональные фотосессии с помощью нейросетей за считанные минуты
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 hover-scale bg-primary hover:bg-primary/90">
                <Icon name="Play" className="mr-2" size={20} />
                Начать обучение
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-scale border-primary/50 hover:bg-primary/10">
                <Icon name="Gift" className="mr-2" size={20} />
                Получить бонус
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Модуля</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">7.5</div>
                  <div className="text-sm text-muted-foreground">Часов видео</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Практик</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">50</div>
                  <div className="text-sm text-muted-foreground">Промтов</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/20 border-secondary">О курсе</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Что вы освоите
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Научитесь создавать уникальные фотосессии любой сложности с помощью современных нейросетей
              </p>
            </div>

            <div className="grid gap-8">
              {modules.map((module, index) => (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                          <Icon name={module.icon as any} size={36} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge variant="outline" className="mb-3 border-primary/50">
                              Модуль {module.number}
                            </Badge>
                            <h3 className="text-3xl font-bold mb-3">{module.title}</h3>
                          </div>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                          {module.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="Clock" size={16} className="text-primary" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="CheckCircle" size={16} className="text-secondary" />
                            <span>{module.tasks} практических заданий</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="BookOpen" size={16} className="text-accent" />
                            <span>{module.lessons.length} мини-гайда</span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline"
                          onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                          className="w-full hover-scale border-primary/30 hover:bg-primary/10"
                        >
                          <Icon name={expandedModule === index ? "ChevronUp" : "ChevronDown"} className="mr-2" size={20} />
                          {expandedModule === index ? "Скрыть гайды" : "Посмотреть гайды"}
                        </Button>
                        
                        {expandedModule === index && (
                          <div className="mt-6 space-y-3 animate-fade-in">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div 
                                key={lessonIndex}
                                className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/30 hover:bg-card/50 hover:border-primary/30 transition-all group"
                              >
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                                    <Icon name="BookOpen" size={18} className="text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium mb-1">{lesson.title}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                                  </div>
                                </div>
                                <Badge variant="outline" className="border-primary/50 flex-shrink-0">
                                  Гайд {lessonIndex + 1}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 border-accent">Бонус</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Сборник 50 промтов
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Готовые проверенные промты с примерами для мгновенного старта
              </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-border/50">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-3xl font-bold mb-6">Что внутри сборника:</h3>
                    <div className="space-y-4">
                      {prompts.map((prompt, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Icon name="Star" size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">{prompt}</p>
                            <p className="text-sm text-muted-foreground">10 готовых промтов</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-8 w-full hover-scale bg-gradient-to-r from-primary via-secondary to-accent">
                      <Icon name="Download" className="mr-2" size={20} />
                      Скачать бесплатно
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-6">Каждый промт включает:</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center flex-shrink-0">
                          <Icon name="FileText" size={24} className="text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Готовый текст</h4>
                          <p className="text-muted-foreground">Детальное описание для нейросети</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center flex-shrink-0">
                          <Icon name="Image" size={24} className="text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Пример результата</h4>
                          <p className="text-muted-foreground">Что получится на выходе</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card/50 flex items-center justify-center flex-shrink-0">
                          <Icon name="Settings" size={24} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Параметры</h4>
                          <p className="text-muted-foreground">Настройки для лучшего качества</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 border-primary">Портфолио</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Работы студентов
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Примеры фотосессий, созданных с помощью нейросетей после прохождения курса
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {studentWorks.map((work) => (
                <Card 
                  key={work.id}
                  className="group bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden hover-scale"
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <img 
                        src={work.image} 
                        alt={work.style}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Badge className="bg-primary/90 mb-2">{work.style}</Badge>
                        <p className="text-sm text-foreground/90 font-medium">
                          {work.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Создано с помощью нейросетей
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CourseEnrollment />

        <footer className="container mx-auto px-4 py-12 border-t border-border/50">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">© 2024 Нейрофотосессия. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;