import { Link } from "react-router-dom";
import {
  MessageSquare,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">ChatFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Recursos
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Como funciona
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div>
            <Link to="/app">
              <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                Acessar Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Comunicação em tempo real para equipes modernas
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  ChatFlow é uma plataforma de chat em tempo real que conecta
                  sua equipe instantaneamente, permitindo colaboração eficiente
                  e comunicação sem interrupções.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link to="/app">
                    <Button
                      size="lg"
                      rightIcon={<ArrowRight className="h-5 w-5" />}
                    >
                      Começar agora
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button variant="outline" size="lg">
                      Saiba mais
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 h-24 w-24 bg-blue-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-blue-100 rounded-full opacity-60"></div>

                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">ChatFlow</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-400"></div>
                        <span className="text-xs">12 online</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 h-80 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          MA
                        </div>
                        <div>
                          <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                            <p className="text-sm">
                              Olá equipe! Alguém pode me ajudar com o novo
                              projeto?
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            09:32
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 justify-end">
                        <div>
                          <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm">
                            <p className="text-sm">
                              Claro! Estou disponível para ajudar. O que você
                              precisa?
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mr-2 text-right block">
                            09:33
                          </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-medium text-blue-800">
                          VC
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          Carlos entrou no chat
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          CA
                        </div>
                        <div>
                          <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                            <p className="text-sm">
                              Olá pessoal! Acabei de entrar no projeto.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            09:35
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg"
                      />
                      <button className="bg-blue-600 text-white p-2 rounded-lg">
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Recursos Poderosos
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tudo o que você precisa para uma comunicação eficiente em um só
              lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tempo Real
              </h3>
              <p className="text-gray-600">
                Mensagens entregues instantaneamente para todos os
                participantes, sem atrasos ou recarregamentos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Colaboração
              </h3>
              <p className="text-gray-600">
                Conecte toda a sua equipe em um ambiente colaborativo com
                suporte para múltiplos usuários.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Segurança
              </h3>
              <p className="text-gray-600">
                Autenticação de usuários e proteção de dados para manter suas
                conversas privadas e seguras.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
            <p className="mt-4 text-xl text-gray-600">
              Simples, rápido e eficiente - comece a usar em minutos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Crie sua conta
              </h3>
              <p className="text-gray-600">
                Faça login com suas credenciais para acessar a plataforma de
                chat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personalize seu perfil
              </h3>
              <p className="text-gray-600">
                Altere seu nome de usuário para ser facilmente identificado por
                outros participantes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="h-16 w-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Comece a conversar
              </h3>
              <p className="text-gray-600">
                Envie mensagens em tempo real e colabore com sua equipe
                instantaneamente.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/app">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Experimentar agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  O ChatFlow é gratuito?
                </h3>
                <p className="text-gray-600">
                  Sim, o ChatFlow é completamente gratuito para uso. Não há
                  custos ocultos ou necessidade de cartão de crédito.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Preciso instalar algum software?
                </h3>
                <p className="text-gray-600">
                  Não, o ChatFlow funciona diretamente no navegador. Não é
                  necessário instalar nenhum software adicional.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  As mensagens são salvas?
                </h3>
                <p className="text-gray-600">
                  Atualmente, as mensagens são armazenadas apenas durante a
                  sessão ativa. Quando você sai do chat, o histórico não é
                  preservado.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Posso usar o ChatFlow em dispositivos móveis?
                </h3>
                <p className="text-gray-600">
                  Sim, o ChatFlow é totalmente responsivo e funciona em
                  smartphones, tablets e computadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para melhorar sua comunicação?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de equipes que já estão usando o ChatFlow para
            colaboração em tempo real.
          </p>
          <Link to="/app">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Começar agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-white p-1.5 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white">ChatFlow</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} ChatFlow. Todos os direitos
                reservados.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">
                  Termos
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Contato
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
