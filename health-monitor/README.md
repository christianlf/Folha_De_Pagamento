# Health Monitor 🏥

Sistema completo de monitoramento de sites, APIs e servidores com alertas em tempo real.

## 🚀 Recursos

- ✅ Monitoramento HTTP/HTTPS
- ✅ Dashboard web em tempo real
- ✅ Sistema de alertas
- ✅ Histórico de disponibilidade
- ✅ Logs detalhados
- ✅ Webhooks (Discord/Slack/Teams)
- ✅ Múltiplos endpoints
- ✅ Estatísticas e métricas

## 📦 Instalação Rápida

```bash
# Instalar dependências
pip install -r requirements.txt

# Configurar (opcional)
cp .env.example .env

# Executar
python monitor.py
```

Acesse: http://localhost:8080

## 🎯 Como Usar

1. Acesse o dashboard
2. Adicione endpoints para monitorar
3. Veja o status em tempo real
4. Receba alertas automáticos

## 📊 Dashboard

Interface web moderna mostrando:
- Status de cada endpoint (UP/DOWN)
- Tempo de resposta
- Uptime %
- Histórico de falhas
- Logs em tempo real

## 🔔 Alertas

Configure alertas para:
- Discord
- Slack
- Microsoft Teams
- Email (em breve)

## 🛠️ Tecnologias

- Python 3
- Flask (Web Dashboard)
- SQLite (Banco de dados)
- Requests (HTTP)
- APScheduler (Agendamento)

## 📝 Configuração

Edite o arquivo `.env`:

```env
# Intervalo de verificação (segundos)
CHECK_INTERVAL=60

# Timeout para requisições
DEFAULT_TIMEOUT=5

# Limite de falhas para alerta
ALERT_THRESHOLD=3

# Webhook URL (Discord/Slack/Teams)
ALERT_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## 🎨 Screenshots

(Dashboard em desenvolvimento)

## 📄 Licença

MIT
